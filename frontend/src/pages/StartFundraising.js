import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StartFundraising = () => {
  const categoryList = [
    'Medical', 'Education', 'Accident', 'Disaster Relief', 'Animal Welfare', 'Children', 'Sports', 'Arts & Culture', 'Environment', 'Community', 'Memorial', 'Travel', 'Business', 'Technology', 'Women', 'Senior Citizens', 'LGBTQ+', 'Legal', 'Housing', 'Food', 'Water', 'Science', 'Religion', 'Other'
  ];
  const [form, setForm] = useState({ title: '', description: '', category: categoryList[0], goalAmount: '', photo: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    const res = await axios.post('/api/upload', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } });
    setForm(f => ({ ...f, photo: res.data.url }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await handleUpload();
      await axios.post('/api/fundraisers', form, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create fundraiser');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Start Fundraising</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required>
          {categoryList.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input name="goalAmount" type="number" placeholder="Goal Amount" value={form.goalAmount} onChange={handleChange} className="w-full border px-3 py-2 mb-4" required />
        <input type="file" onChange={handleFile} className="w-full mb-4" accept="image/*,video/*" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Create Fundraiser</button>
      </form>
    </div>
  );
};

export default StartFundraising;
