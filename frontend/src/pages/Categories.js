import React, { useState } from 'react';

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
  { name: 'Memorial', icon: '🕊️' },
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

const sampleCampaigns = {
  Medical: [
    { title: 'Help John Fight Cancer', description: 'Support John in his battle against leukemia.', amount: 120000, goal: 200000, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { title: 'Surgery for Baby Mia', description: 'Urgent heart surgery needed for Mia.', amount: 80000, goal: 150000, img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' }
  ],
  Education: [
    { title: 'Scholarship for Priya', description: 'Help Priya attend college.', amount: 30000, goal: 100000, img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { title: 'Books for Rural Kids', description: 'Donate books to children in rural areas.', amount: 15000, goal: 50000, img: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=400&q=80' }
  ],
  Food: [
    { title: 'Meals for Homeless', description: 'Provide daily meals for the homeless.', amount: 5000, goal: 25000, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { title: 'Community Kitchen', description: 'Support our free kitchen for families in need.', amount: 12000, goal: 30000, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' }
  ],
  Accident: [
    { title: 'Road Accident Recovery', description: 'Help Ramesh recover from a road accident.', amount: 40000, goal: 100000, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' }
  ],
  // ...add more sample campaigns for other categories as needed
};

const Categories = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-[60vh] flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Browse by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-6xl mb-8">
        {categoryList.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelected(cat.name)}
            className={`flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-2 ${selected === cat.name ? 'border-blue-500' : 'border-gray-100'}`}
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <span className="font-semibold text-gray-700">{cat.name}</span>
          </button>
        ))}
      </div>
      {selected && (
        <>
          <div className="text-2xl font-bold text-blue-600 mb-4">{selected} Campaigns</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {(sampleCampaigns[selected] || []).map((c, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.03] transition">
                <img src={c.img} alt={c.title} className="w-full h-40 object-cover rounded mb-4" />
                <div className="font-bold text-lg mb-2 text-center">{c.title}</div>
                <div className="text-gray-600 mb-2 text-center">{c.description}</div>
                <div className="font-semibold text-blue-700 mb-1">₹{c.amount} raised of ₹{c.goal} goal</div>
                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">View Campaign</button>
              </div>
            ))}
            {(sampleCampaigns[selected] || []).length === 0 && (
              <div className="text-gray-500 col-span-full text-center">No campaigns yet for this category.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
