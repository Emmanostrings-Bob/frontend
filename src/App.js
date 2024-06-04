import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ReportLostItem from './components/Items/ReportLostItem';
import ReportFoundItem from './components/Items/ReportFoundItem';
import SearchItems from './components/Items/SearchItems';
import CommentSection from './components/Comments.jsx/CommentSection';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      {/* <Notifications /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report-lost" element={<ReportLostItem />} />
        <Route path="/report-found" element={<ReportFoundItem />} />
        <Route path="/search" element={<SearchItems />} />
        <Route path="/comments/:itemId" element={<CommentSection />} />
      </Routes>
    </Router>
  );
};

export default App;
