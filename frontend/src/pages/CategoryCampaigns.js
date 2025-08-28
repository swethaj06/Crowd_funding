import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryCampaigns = () => {
  const { categoryName } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    axios.get('/api/fundraisers').then(res => {
      setCampaigns(res.data.filter(f => f.category === categoryName));
    });
  }, [categoryName]);
  return (
    <div className="min-h-[60vh] flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">{categoryName} Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {campaigns.length > 0 ? campaigns.map((c, idx) => (
          <div key={c._id || idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.03] transition">
            {/* If you have image upload, use c.photo, else show a placeholder */}
            <img src={c.photo || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'} alt={c.title} className="w-full h-40 object-cover rounded mb-4" />
            <div className="font-bold text-lg mb-2 text-center">{c.title}</div>
            <div className="text-gray-600 mb-2 text-center">{c.description}</div>
            <div className="font-semibold text-blue-700 mb-1">₹{c.currentAmount} raised of ₹{c.goalAmount} goal</div>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">View Campaign</button>
          </div>
        )) : (
          <div className="text-gray-500 col-span-full text-center">No campaigns yet for this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryCampaigns;
