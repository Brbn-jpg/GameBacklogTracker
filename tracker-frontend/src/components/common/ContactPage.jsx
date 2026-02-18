import React from 'react';
import MainLayout from '../layout/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.40))] p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-black neo-border-thick dark:border-white neo-shadow-lg p-10 md:p-16 max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic text-black dark:text-white">
              Get in <span className="bg-yellow-400 dark:bg-yellow-500 px-4 not-italic text-black">Touch</span>
            </h1>
            <p className="text-xl font-bold uppercase tracking-widest text-black/60 dark:text-white/80">
              Establish communication with the developer.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1 text-black dark:text-white">Direct Transmission</p>
              <a 
                href="mailto:kubon.kuznicki@gmail.com" 
                className="block bg-white dark:bg-black neo-border-thick dark:border-white p-5 text-lg md:text-2xl font-black uppercase hover:bg-cyan-400 dark:hover:bg-cyan-500 neo-shadow dark:neo-shadow-white neo-transition text-center break-all text-black dark:text-white"
              >
                kubon.kuznicki@gmail.com
              </a>
            </div>

            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1 text-black dark:text-white">Source Repository</p>
              <a 
                href="https://github.com/brbn-jpg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-white dark:bg-black neo-border-thick dark:border-white p-5 text-2xl font-black uppercase hover:bg-emerald-400 dark:hover:bg-emerald-500 neo-shadow dark:neo-shadow-white neo-transition text-center text-black dark:text-white"
              >
                github.com/brbn-jpg
              </a>
            </div>

            <div className="group">
              <p className="text-xs font-black uppercase mb-2 ml-1 text-black dark:text-white">Official Website</p>
              <a 
                href="https://brbn.pl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-white dark:bg-black neo-border-thick dark:border-white p-5 text-2xl font-black uppercase hover:bg-yellow-400 dark:hover:bg-yellow-500 neo-shadow dark:neo-shadow-white neo-transition text-center text-black dark:text-white"
              >
                brbn.pl
              </a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-4 border-black dark:border-white text-center italic">
            <p className="text-lg font-bold uppercase text-black dark:text-white">Awaiting your query.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
