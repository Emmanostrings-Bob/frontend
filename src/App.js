
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './components/Context';
import Navbar from './components/NavBar';
import Home from './components/Home/Home';
import ReportLostItem from './components/Items/ReportLostItem';
import ReportFoundItem from './components/Items/ReportFoundItem';
import Notifications from './components/Notifications/Notifications';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/report-lost"
          element={
            <ProtectedRoute>
              <ReportLostItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-found"
          element={
            <ProtectedRoute>
              <ReportFoundItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
