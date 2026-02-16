import React from 'react';
import MainLayout from '../layout/MainLayout';

const BlogPage = () => {
  const roadmapItems = [
    {
      id: 1,
      title: 'Friends and User Browsing',
      description: 'Implement functionality to browse other users, send friend requests, and manage a friends list.',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Enhanced User Profile Management',
      description: 'Add options for users to make their profile private, change their password, email, and username.',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Forgot Password Functionality',
      description: 'Introduce a "Forgot Password" feature to allow users to reset their password via email or other secure methods.',
      status: 'Completed',
    },
    {
      id: 4,
      title: 'Secure Account Creation with 6-Digit Code',
      description: 'Enhance account security by adding a 6-digit verification code step during new account creation.',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Making Categories, Genres, and Tags a Select with Options',
      description: 'To improve the filtering experience, we will be changing the text-based inputs for categories, genres, and tags into select dropdowns with predefined options. This will make it easier to discover and filter games.',
      status: 'Completed',
    },
    {
      id: 6,
      title: 'IGDB API Integration',
      description: 'Integrate with the Internet Game Database (IGDB) to automatically fetch rich game data, including covers, release dates, and developer info, replacing manual entry.',
      status: 'Completed',
    },
    {
      id: 7,
      title: 'Steam Library Import',
      description: 'Allow users to link their Steam account and automatically import their game library, playtime, and completion status directly into the tracker.',
      status: 'Planned',
    },
    {
      id: 8,
      title: 'Gamification & Advanced Stats',
      description: 'Introduce badges, achievements, and detailed visualization of gaming habits (e.g., genre breakdowns, completion rates) to increase user engagement.',
      status: 'Planned',
    },
  ];

  const plannedItems = roadmapItems.filter(item => item.status !== 'Completed');
  const completedItems = roadmapItems.filter(item => item.status === 'Completed');

  const RoadmapSection = ({ title, items }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-200 flex items-center">
        {title}
        <span className="ml-3 h-px flex-grow bg-white/10"></span>
      </h2>
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                item.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-400' : 
                'bg-purple-500/20 text-purple-400'
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
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-8 text-white">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Our Roadmap</h1>
        
        <RoadmapSection title="Coming Soon" items={plannedItems} />
        <RoadmapSection title="Completed" items={completedItems} />
        
      </div>
    </MainLayout>
  );
};

export default BlogPage;
