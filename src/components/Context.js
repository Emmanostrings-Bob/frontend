
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import useSound from 'use-sound';
import notificationSound from '../assets/mixkit-arcade-magic-notification-2342.wav';

const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [playNotificationSound] = useSound(notificationSound);

  const fetchUser = useCallback(async () => {
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }, [token]);

  const fetchItems = useCallback(async () => {
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const lost = data.filter(item => item.type === 'lost');
        const found = data.filter(item => item.type === 'found');
        setLostItems(lost);
        setFoundItems(found);
      } else {
        const errorData = await res.json().catch(() => ({ msg: 'Invalid response' }));
        throw new Error(`Failed to fetch items: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }, [token]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    if (token) {
      fetchUser();
      fetchItems();
    }

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
      playNotificationSound();
    });

    return () => {
      socket.disconnect();
    };
  }, [token, fetchUser, fetchItems, playNotificationSound]);

  const loginUser = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await fetchUser();
        await fetchItems();
      } else {
        const errorData = await res.json();
        throw new Error(`Login failed: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        await fetchUser();
        await fetchItems();
      } else {
        const errorData = await res.json();
        throw new Error(`Registration failed: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const reportLostItem = async (item) => {
    try {
      const res = await fetch('http://localhost:5000/api/items/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ ...item, type: 'lost' }),
      });

      if (res.ok) {
        const data = await res.json();
        setLostItems((prevItems) => [...prevItems, data]);
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to report lost item: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const reportFoundItem = async (item) => {
    try {
      const res = await fetch('http://localhost:5000/api/items/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ ...item, type: 'found' }),
      });

      if (res.ok) {
        const data = await res.json();
        setFoundItems((prevItems) => [...prevItems, data]);
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to report found item: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const claimItem = async (itemId) => {
    try {
      const res = await fetch('http://localhost:5000/api/items/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ itemId }),
      });

      if (res.ok) {
        const data = await res.json();
        setLostItems((prevItems) =>
          prevItems.map((item) => (item._id === data._id ? data : item))
        );
        setFoundItems((prevItems) =>
          prevItems.map((item) => (item._id === data._id ? data : item))
        );
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: `${data.username}, your reported item has been claimed` }
        ]);
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to claim item: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const markItemFound = async (itemId) => {
    try {
      const res = await fetch('http://localhost:5000/api/items/found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ itemId }),
      });

      if (res.ok) {
        const data = await res.json();
        setLostItems((prevItems) =>
          prevItems.map((item) => (item._id === data._id ? data : item))
        );
        setFoundItems((prevItems) =>
          prevItems.map((item) => (item._id === data._id ? data : item))
        );
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: `${data.username}, your item has been marked as found` }
        ]);
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to mark item as found: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const addComment = async (item, comment) => {
    try {
      const res = await fetch('http://localhost:5000/api/items/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ itemId: item._id, ...comment }),
      });

      if (res.ok) {
        item.comments = item.comments || [];
        item.comments.push(comment); 
        setLostItems((prevItems) =>
          prevItems.map((i) => (i._id === item._id ? { ...i, comments: item.comments } : i))
        );
        setFoundItems((prevItems) =>
          prevItems.map((i) => (i._id === item._id ? { ...i, comments: item.comments } : i))
        );
      } else {
        const errorData = await res.json();
        throw new Error(`Failed to add comment: ${res.status} ${res.statusText} - ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        lostItems,
        foundItems,
        notifications,
        user,
        loginUser,
        registerUser,
        logoutUser,
        reportLostItem,
        reportFoundItem,
        claimItem,
        markItemFound,
        addComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
