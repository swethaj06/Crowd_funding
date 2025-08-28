import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const categoryList = [
  { name: 'Medical', icon: '🩺' },
  { name: 'Education', icon: '🎓' },
  { name: 'Accident', icon: '🚑' },
  { name: 'Disaster Relief', icon: '🌪️' },
  { name: 'Animal Welfare', icon: '🐾' },
  { name: 'Children', icon: '🧒' },
  { name: 'Sports', icon: '🏅' },
  { name: 'Arts & Culture', icon: '🎨' },
  { name: 'Environment', icon: '🌳' },
  { name: 'Community', icon: '🏘️' },
  { name: 'Memorial', icon: '🔊' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Business', icon: '💼' },
  { name: 'Technology', icon: '💻' },
  { name: 'Women', icon: '👩' },
  { name: 'Senior Citizens', icon: '👴' },
  { name: 'LGBTQ+', icon: '🏳️‍🌈' },
  { name: 'Legal', icon: '⚖️' },
  { name: 'Housing', icon: '🏠' },
  { name: 'Food', icon: '🍲' },
  { name: 'Water', icon: '💧' },
  { name: 'Science', icon: '🔬' },
  { name: 'Religion', icon: '🙏' },
  { name: 'Other', icon: '✨' }
];

const Campaigns = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [campaigns, setCampaigns] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', goalAmount: '' });
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const [donateAmount, setDonateAmount] = useState({});

  useEffect(() => {
    axios.get('/api/fundraisers').then(res => {
      setCampaigns(res.data);
    }).catch(() => setError("Could not load campaigns."));
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/fundraisers', form, { headers: { Authorization: 'Bearer ' + token } });
      setShowCreate(false);
      setForm({ title: '', description: '', category: '', goalAmount: '' });
      axios.get('/api/fundraisers').then(res => setCampaigns(res.data));
    } catch {
      setError("Failed to create campaign.");
    }
  };

  const filteredCampaigns = selectedCategory === 'All'
    ? campaigns
    : campaigns.filter(c => c.category === selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Campaigns</h1>
      {token && (
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >Logout</button>
        </div>
      )}
      <div className="flex justify-center mb-8">
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? 'Cancel' : 'Create New Campaign'}
        </button>
      </div>
      {showCreate && (
        <form onSubmit={handleCreate} className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categoryList.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
            ))}
          </select>
          <input
            type="number"
            name="goalAmount"
            placeholder="Goal Amount"
            value={form.goalAmount}
            onChange={e => setForm({ ...form, goalAmount: e.target.value })}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold shadow ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categoryList.map(cat => (
          <button
            key={cat.name}
            className={`px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {filteredCampaigns.length > 0 ? filteredCampaigns.map((c, idx) => (
          <div key={c._id || idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.03] transition">
            <img src={c.photo || 'https://shaavifoundation.com/wp-content/uploads/2022/01/Help.jpg'} alt={c.title} className="w-full h-40 object-cover rounded mb-4" />
            <div className="font-bold text-lg mb-2 text-center">{c.title}</div>
            <div className="text-gray-600 mb-2 text-center">{c.description}</div>
            <div className="font-semibold text-blue-700 mb-1">₹{c.currentAmount} raised of ₹{c.goalAmount} goal</div>
            <div className="text-sm text-gray-500 mb-2">Category: {c.category}</div>
            <div className="flex flex-col items-center w-full">
              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={donateAmount[c._id] || ''}
                onChange={e => setDonateAmount({ ...donateAmount, [c._id]: e.target.value })}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-full"
                onClick={async () => {
                  try {
                    await axios.post('/api/donations', { fundraiserId: c._id, amount: donateAmount[c._id] }, { headers: { Authorization: 'Bearer ' + token } });
                    setDonateAmount({ ...donateAmount, [c._id]: '' });
                    axios.get('/api/fundraisers').then(res => setCampaigns(res.data));
                  } catch {
                    setError('Donation failed.');
                  }
                }}
                disabled={!donateAmount[c._id] || !token}
              >
                Donate
              </button>
            </div>
          </div>
        )) : (
          <div className="text-gray-500 col-span-full text-center">No campaigns yet for this category.</div>
        )}
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Campaigns;
