import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'donor', phone: '', address: '', pincode: '', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <input name="fullName" type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 mb-4">
          <option value="donor">Donor</option>
          <option value="fundraiser">Fundraiser</option>
        </select>
        <input name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 mb-4" />
        <input name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border px-3 py-2 mb-4" />
        <input name="pincode" type="text" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="w-full border px-3 py-2 mb-4" />
        <input name="location" type="text" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border px-3 py-2 mb-4" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
