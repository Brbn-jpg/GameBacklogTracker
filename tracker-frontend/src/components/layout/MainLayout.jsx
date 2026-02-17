import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
