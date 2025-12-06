import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactPage = () => {
  return (
    <div className="bg-slate-950 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-white">
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-slate-300 mb-8">
            You can reach me through the following channels:
          </p>
          <div className="space-y-4 text-lg">
            <div className="flex items-center justify-center space-x-3">
              <span>Email:</span>
              <a href="mailto:kubon.kuznicki@gmail.com" className="text-cyan-400 hover:underline">
                kubon.kuznicki@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span>GitHub:</span>
              <a href="https://github.com/brbn-jpg" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                github.com/brbn-jpg
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span>Website:</span>
              <a href="https://brbn.pl" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                brbn.pl
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
