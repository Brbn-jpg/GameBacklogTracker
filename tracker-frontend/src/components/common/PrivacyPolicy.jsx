import React from 'react';
import MainLayout from '../layout/MainLayout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white neo-border-thick p-8 md:p-12 neo-shadow">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
            Privacy <span className="bg-cyan-400 px-2">Policy</span>
          </h1>
          
          <div className="space-y-8 font-medium">
            <section>
              <h2 className="text-2xl font-black uppercase mb-2">1. Data Collection</h2>
              <p>We collect minimal data required for operation: username, email address, and your game library status. We do not track your location or sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">2. Usage of Information</h2>
              <p>Your data is used solely to provide the GameLog service: maintaining your backlog, wishlist, and friend connections. Aggregated, anonymized data may be used for community statistics.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">3. Third-Party Services</h2>
              <p>We utilize the IGDB API for game metadata. Please refer to their privacy policy regarding data interaction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-2">4. Data Security</h2>
              <p>We implement standard security measures to protect your account. However, no transmission over the internet is 100% secure.</p>
            </section>

            <div className="border-t-4 border-black pt-6 mt-8">
              <p className="text-sm font-black uppercase text-black/60">Last Updated: {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
