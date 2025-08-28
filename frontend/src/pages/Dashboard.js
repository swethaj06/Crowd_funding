import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', goalAmount: '' });
  const [donateAmount, setDonateAmount] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view your dashboard.");
      return;
    }
    axios.get('/api/fundraisers').then(res => {
      setFundraisers(res.data);
    }).catch(() => setError("Could not load campaigns."));
  }, [token]);

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/fundraisers', form, { headers: { Authorization: 'Bearer ' + token } });
      setShowCreate(false);
      setForm({ title: '', description: '', category: '', goalAmount: '' });
      axios.get('/api/fundraisers').then(res => setFundraisers(res.data));
    } catch {
      setError("Failed to create campaign.");
    }
  };

  const handleDonate = async (id) => {
    try {
      await axios.post('/api/donations', { fundraiserId: id, amount: donateAmount[id] }, { headers: { Authorization: 'Bearer ' + token } });
      setDonateAmount({ ...donateAmount, [id]: '' });
      axios.get('/api/fundraisers').then(res => setFundraisers(res.data));
    } catch {
      setError("Donation failed.");
    }
  };

  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Dashboard</h1>
      <div className="flex justify-center mb-8">
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? 'Cancel' : 'Create New Campaign'}
        </button>
      </div>
      {showCreate && (
        <form onSubmit={handleCreate} className="max-w-lg mx-auto bg-white p-6 rounded shadow mb-8">
          <input name="title" type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border px-3 py-2 mb-4" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border px-3 py-2 mb-4" required />
          <input name="category" type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border px-3 py-2 mb-4" required />
          <input name="goalAmount" type="number" placeholder="Goal Amount" value={form.goalAmount} onChange={e => setForm({ ...form, goalAmount: e.target.value })} className="w-full border px-3 py-2 mb-4" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Create</button>
        </form>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-center">All Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fundraisers.length === 0 ? (
          <div className="text-gray-500 col-span-full text-center">No campaigns yet.</div>
        ) : fundraisers.map(f => (
          <div key={f._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="font-bold text-lg mb-2 text-center">{f.title}</div>
            <div className="text-gray-600 mb-2 text-center">{f.description}</div>
            <div className="font-semibold text-blue-700 mb-1">₹{f.currentAmount} raised of ₹{f.goalAmount} goal</div>
            <input
              type="number"
              placeholder="Amount to donate"
              value={donateAmount[f._id] || ''}
              onChange={e => setDonateAmount({ ...donateAmount, [f._id]: e.target.value })}
              className="border px-2 py-1 mt-2 mb-2 w-full"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-full"
              onClick={() => handleDonate(f._id)}
            >
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
