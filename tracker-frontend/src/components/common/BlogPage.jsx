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
      title: 'Select-based Categories & Genres',
      description: 'Changing text-based inputs into select dropdowns with predefined options for better filtering.',
      status: 'Completed',
    },
    {
      id: 6,
      title: 'IGDB API Integration',
      description: 'Integrate with the Internet Game Database (IGDB) to automatically fetch rich game data.',
      status: 'Completed',
    },
    {
      id: 7,
      title: 'Steam Library Import',
      description: 'Allow users to link their Steam account and automatically import their game library.',
      status: 'Planned',
    },
    {
      id: 8,
      title: 'Gamification & Stats',
      description: 'Introduce badges, achievements, and detailed visualization of gaming habits.',
      status: 'Planned',
    },
    {
      id: 9,
      title: 'Dark Mode Implementation',
      description: 'Support for dark mode interface.',
      status: 'Planned',
    },
  ];

  const plannedItems = roadmapItems.filter(item => item.status !== 'Completed');
  const completedItems = roadmapItems.filter(item => item.status === 'Completed');

  const RoadmapSection = ({ title, items, colorClass }) => (
    <div className="mb-20">
      <h2 className={`text-4xl font-black uppercase mb-10 inline-block px-4 py-2 neo-border-thick neo-shadow ${colorClass}`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white neo-border-thick p-6 neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter">{item.title}</h3>
              <span className={`px-3 py-1 text-xs font-black uppercase neo-border whitespace-nowrap ${
                item.status === 'Completed' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-lg font-bold leading-snug text-black/80">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-16 border-l-8 border-black pl-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            System <span className="bg-yellow-400 px-2">Roadmap</span>
          </h1>
          <p className="text-2xl font-black uppercase tracking-widest text-black/60">Deployment status & future updates.</p>
        </div>
        
        <RoadmapSection title="Incoming" items={plannedItems} colorClass="bg-cyan-400" />
        <RoadmapSection title="Deployed" items={completedItems} colorClass="bg-emerald-400" />
        
      </div>
    </MainLayout>
  );
};

export default BlogPage;
