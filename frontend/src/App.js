import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import FundraiserDetails from './pages/FundraiserDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/campaigns' element={<Campaigns />} />
        <Route path='/fundraiser/:id' element={<FundraiserDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
