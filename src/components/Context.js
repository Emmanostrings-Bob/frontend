import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const reportLostItem = (item) => {
    setLostItems([...lostItems, item]);
    setNotifications([...notifications, `Lost item reported: ${item.description}`]);
  };

  const reportFoundItem = (item) => {
    setFoundItems([...foundItems, item]);
    setNotifications([...notifications, `Found item reported: ${item.description}`]);
  };

  return (
    <AppContext.Provider value={{ lostItems, foundItems, notifications, reportLostItem, reportFoundItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
