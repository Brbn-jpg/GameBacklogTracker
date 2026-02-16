import React from 'react';
import MainLayout from '../layout/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))] text-white p-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Contact Me</h1>
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
      </div>
    </MainLayout>
  );
};

export default ContactPage;
