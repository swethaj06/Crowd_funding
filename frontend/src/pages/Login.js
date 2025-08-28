import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
  navigate('/campaigns');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2 mb-4" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2 mb-4" required />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
