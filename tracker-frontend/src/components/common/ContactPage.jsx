import React from 'react';
import MainLayout from '../layout/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.40))] p-4">
        <div className="bg-white neo-border-thick neo-shadow-lg p-10 md:p-16 max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic">
              Get in <span className="bg-yellow-400 px-4 not-italic">Touch</span>
            </h1>
            <p className="text-xl font-bold uppercase tracking-widest text-black/60">
              Establish communication with the developer.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1">Direct Transmission</p>
              <a 
                href="mailto:kubon.kuznicki@gmail.com" 
                className="block bg-white neo-border-thick p-5 text-lg md:text-2xl font-black uppercase hover:bg-cyan-400 neo-shadow neo-transition text-center break-all"
              >
                kubon.kuznicki@gmail.com
              </a>
            </div>

            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1">Source Repository</p>
              <a 
                href="https://github.com/brbn-jpg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-white neo-border-thick p-5 text-2xl font-black uppercase hover:bg-emerald-400 neo-shadow neo-transition text-center"
              >
                github.com/brbn-jpg
              </a>
            </div>

            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1">Official Website</p>
              <a 
                href="https://brbn.pl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-white neo-border-thick p-5 text-2xl font-black uppercase hover:bg-yellow-400 neo-shadow neo-transition text-center"
              >
                brbn.pl
              </a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-4 border-black text-center italic">
            <p className="text-lg font-bold uppercase">Awaiting your query.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
