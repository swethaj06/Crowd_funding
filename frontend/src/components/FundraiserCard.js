import React from 'react';
import { Link } from 'react-router-dom';

const FundraiserCard = ({ fundraiser }) => (
  <div className="bg-white rounded shadow p-4 hover:scale-105 transition-transform">
    <img src={fundraiser.photo || 'https://via.placeholder.com/300x200'} alt={fundraiser.title} className="w-full h-40 object-cover rounded" />
    <h2 className="text-xl font-bold mt-2">{fundraiser.title}</h2>
    <p className="text-gray-600">{fundraiser.description.slice(0, 80)}...</p>
    <div className="flex justify-between items-center mt-2">
      <span className="font-semibold text-blue-600">₹{fundraiser.currentAmount} / ₹{fundraiser.goalAmount}</span>
      <Link to={`/fundraiser/${fundraiser._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</Link>
    </div>
  </div>
);

export default FundraiserCard;
