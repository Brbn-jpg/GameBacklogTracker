import React from 'react';
import MainLayout from '../layout/MainLayout';

const TermsOfService = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white neo-border-thick p-8 md:p-12 neo-shadow">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
            Terms of <span className="bg-emerald-400 px-2">Service</span>
          </h1>
          
          <div className="space-y-8 font-medium">
            <section>
              <h2 className="text-2xl font-black uppercase mb-2">1. Acceptance</h2>
              <p>By accessing GameLog, you agree to be bound by these Terms of Service. If you do not agree, initiate session termination immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">2. User Accounts</h2>
              <p>You are responsible for maintaining the security of your account credentials. Any activity under your account is your liability.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">3. Acceptable Use</h2>
              <p>Do not abuse the API, spam the platform, or attempt to reverse engineer the system. Violators will be ejected.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">4. Content</h2>
              <p>Game data is provided by IGDB. We claim no ownership over game titles, artwork, or associated intellectual property.</p>
            </section>

            <div className="border-t-4 border-black pt-6 mt-8">
              <p className="text-sm font-black uppercase text-black/60">Effective Date: {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
