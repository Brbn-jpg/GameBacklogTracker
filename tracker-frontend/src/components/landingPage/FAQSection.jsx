import React from "react";

const FAQSection = () => {
  return (
    <section id="faq" className="mt-10 py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* FAQ Item 1 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-shadow duration-300">
            <h3 className="text-white font-bold text-2xl mb-2">
              Is GameLog free to use?
            </h3>
            <p className="text-cyan-400 text-lg font-semibold">
              Yes, GameLog is completely free!
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-shadow duration-300">
            <h3 className="text-white font-bold text-xl mb-2">
              Where are you getting games data?
            </h3>
            <p className="text-gray-400">
              Currently, we use a dataset from Kaggle. However, we have plans to
              integrate with the IGDB API to provide more comprehensive and
              up-to-date game information.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-shadow duration-300">
            <h3 className="text-white font-bold text-xl mb-2">
              Can I import my game data from Steam?
            </h3>
            <p className="text-gray-400">
              As of now, we do not support direct import of game data from
              platforms like Steam. This is a highly requested feature, and we
              plan to implement it in future updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
