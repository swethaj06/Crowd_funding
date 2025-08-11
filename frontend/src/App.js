import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import FundraiserDetails from './pages/FundraiserDetails';
import StartFundraising from './pages/StartFundraising';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/fundraiser/:id' element={<FundraiserDetails />} />
        <Route path='/start-fundraising' element={<StartFundraising />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
