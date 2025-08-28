import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center py-24 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Welcome to FundMe</h1>
      <div className="flex gap-8">
        <button
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="px-8 py-4 bg-green-500 text-white rounded-lg text-xl font-semibold shadow hover:bg-green-600 transition"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
