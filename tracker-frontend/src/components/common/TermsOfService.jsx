import React from 'react';
import MainLayout from '../layout/MainLayout';

const TermsOfService = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12 transition-colors duration-300">
        <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 md:p-12 neo-shadow dark:neo-shadow-white">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black dark:border-white pb-4 text-black dark:text-white">
            Terms of <span className="bg-emerald-400 dark:bg-emerald-500 px-2 text-black">Service</span>
          </h1>
          
          <div className="space-y-8 font-medium text-black dark:text-white">
            <section>
              <h2 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">1. Acceptance</h2>
              <p>By accessing GameLog, you agree to be bound by these Terms of Service. If you do not agree, initiate session termination immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">2. User Accounts</h2>
              <p>You are responsible for maintaining the security of your account credentials. Any activity under your account is your liability.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">3. Acceptable Use</h2>
              <p>Do not abuse the API, spam the platform, or attempt to reverse engineer the system. Violators will be ejected.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">4. Content</h2>
              <p>Game data is provided by IGDB. We claim no ownership over game titles, artwork, or associated intellectual property.</p>
            </section>

            <div className="border-t-4 border-black dark:border-white pt-6 mt-8">
              <p className="text-sm font-black uppercase text-black/60 dark:text-white/60">Effective Date: {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
