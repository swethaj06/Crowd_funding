import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/categories', label: 'Categories' },
  { to: '/start-fundraising', label: 'Start Fundraising' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' }
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-2xl font-bold text-blue-600">FundMe</Link>
      <div className="flex gap-4">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-2 py-1 rounded transition font-medium ${location.pathname === link.to ? 'bg-blue-100 text-blue-700 shadow' : 'hover:text-blue-500'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
