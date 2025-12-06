import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogPage = () => {
  const roadmapItems = [
    {
      id: 1,
      title: 'Adding Polish Dataset',
      description: 'We are working on adding a full Polish dataset to provide a better experience for our Polish-speaking users. This includes translating the UI and adding Polish descriptions for games.',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Making Categories, Genres, and Tags a Select with Options',
      description: 'To improve the filtering experience, we will be changing the text-based inputs for categories, genres, and tags into select dropdowns with predefined options. This will make it easier to discover and filter games.',
      status: 'Planned',
    },
  ];

  return (
    <div className="bg-slate-950 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-8 text-white">
        <h1 className="text-4xl font-bold mb-8">Our Roadmap</h1>
        <div className="space-y-8">
          {roadmapItems.map((item) => (
            <div key={item.id} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  item.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed mt-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
