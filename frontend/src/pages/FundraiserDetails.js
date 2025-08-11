import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';

const FundraiserDetails = () => {
  const { id } = useParams();
  const [fundraiser, setFundraiser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [heartCount, setHeartCount] = useState(0);
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/api/fundraisers`).then(res => {
      setFundraiser(res.data.find(f => f._id === id));
    });
    axios.get(`/api/donations/${id}`).then(res => setDonations(res.data));
    axios.get(`/api/hearts/${id}`).then(res => setHeartCount(res.data.count));
  }, [id]);

  const handleDonate = async () => {
    // Simulate GPay/UPI (replace with real integration as needed)
    await axios.post('/api/donations', { fundraiserId: id, amount, comment }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    setAmount('');
    setComment('');
    axios.get(`/api/donations/${id}`).then(res => setDonations(res.data));
  };

  const handleHeart = async () => {
    await axios.post('/api/hearts', { fundraiserId: id }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    axios.get(`/api/hearts/${id}`).then(res => setHeartCount(res.data.count));
  };

  if (!fundraiser) return <div>Loading...</div>;

  return (
    <>
      <SEO title={fundraiser.title + ' | FundMe'} description={fundraiser.description} />
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={fundraiser.photo || 'https://via.placeholder.com/400x300'} alt={fundraiser.title} className="w-full md:w-1/2 rounded shadow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{fundraiser.title}</h1>
            <p className="text-gray-700 mb-2">{fundraiser.description}</p>
            <div className="mb-2">Category: <span className="font-semibold">{fundraiser.category}</span></div>
            <div className="mb-2">Goal: ₹{fundraiser.goalAmount}</div>
            <div className="mb-2">Raised: ₹{fundraiser.currentAmount}</div>
            <button onClick={handleHeart} className="text-red-500 text-2xl mr-2">❤️</button> {heartCount} hearts
            <div className="mt-4">
              <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border px-2 py-1 mr-2" />
              <input type="text" placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} className="border px-2 py-1 mr-2" />
              <button onClick={handleDonate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Donate</button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Recent Donations</h2>
          <ul>
            {donations.map(d => (
              <li key={d._id} className="border-b py-2">
                <span className="font-semibold">{d.donor.fullName}</span>: ₹{d.amount} - {d.comment} <span className="text-xs text-gray-500">({new Date(d.createdAt).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FundraiserDetails;
