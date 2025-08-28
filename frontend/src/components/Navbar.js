import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/campaigns', label: 'Campaigns' }
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
        {localStorage.getItem('token') && (
          <button
            className="px-2 py-1 rounded transition font-medium bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
