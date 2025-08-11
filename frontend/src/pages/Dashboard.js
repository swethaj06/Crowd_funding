import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view your dashboard.");
      return;
    }
    let myId = "";
    try {
      myId = JSON.parse(atob(token.split('.')[1])).id;
    } catch {
      setError("Invalid token. Please log in again.");
      return;
    }
    axios.get('/api/fundraisers').then(res => {
      setFundraisers(res.data.filter(f => f.fundraiser._id === myId));
    }).catch(() => setError("Could not load fundraisers."));
    axios.get('/api/donations').then(res => setDonations(res.data)).catch(() => setError("Could not load donations."));
  }, [token]);
  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-500 text-lg">{error}</div>;
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
      <h2 className="text-lg font-semibold mb-2">My Fundraisers</h2>
      <ul>
        {fundraisers.length === 0 ? (
          <li className="text-gray-500">You have not started any fundraisers yet.</li>
        ) : fundraisers.map(f => (
          <li key={f._id} className="border-b py-2">
            <span className="font-bold">{f.title}</span> - ₹{f.currentAmount} / ₹{f.goalAmount}
            <a href={`/fundraiser/${f._id}`} className="ml-2 text-blue-500 underline">Share Link</a>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-2">Recent Donations</h2>
      <ul>
        {donations.length === 0 ? (
          <li className="text-gray-500">No donations yet.</li>
        ) : donations.map(d => (
          <li key={d._id} className="border-b py-2">
            <span className="font-semibold">{d.donor?.fullName || "Anonymous"}</span>: ₹{d.amount} - {d.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
