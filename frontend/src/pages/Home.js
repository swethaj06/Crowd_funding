import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FundraiserCard from '../components/FundraiserCard';

const Home = () => {
  const [fundraisers, setFundraisers] = useState([]);
  useEffect(() => {
    axios.get('/api/fundraisers').then(res => setFundraisers(res.data));
  }, []);
  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Featured Causes</h1>
      {fundraisers.length === 0 ? (
        <div className="text-gray-500 text-lg mt-8">No fundraisers yet. Be the first to <a href="/start-fundraising" className="text-blue-500 underline">start one</a>!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {fundraisers.map(f => <FundraiserCard key={f._id} fundraiser={f} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
