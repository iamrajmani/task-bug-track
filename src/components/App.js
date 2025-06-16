import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './authentication/Login';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './ui/PrivateRoute';
import Navbar from './ui/Navbar';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;