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
        <div className="text-lg text-gray-600 mt-4">Showing fundraisers for <span className="font-bold text-blue-600">{selected}</span>. (Connect to backend to show actual fundraisers.)</div>
      )}
    </div>
  );
};

export default Categories;
