import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    axios.get('/api/admin/pending-fundraisers', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }).then(res => setPending(res.data));
  }, []);
  const handleApprove = async id => {
    await axios.post(`/api/admin/approve/${id}`, {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    setPending(pending.filter(f => f._id !== id));
  };
  const handleReject = async id => {
    await axios.post(`/api/admin/reject/${id}`, {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    setPending(pending.filter(f => f._id !== id));
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-lg font-semibold mb-2">Pending Fundraiser Requests</h2>
      <ul>
        {pending.map(f => (
          <li key={f._id} className="border-b py-2 flex justify-between items-center">
            <span className="font-bold">{f.title}</span> by {f.fundraiser.fullName} ({f.fundraiser.email})
            <div>
              <button onClick={() => handleApprove(f._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Approve</button>
              <button onClick={() => handleReject(f._id)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
