import React from "react";

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase mb-20 tracking-tighter text-black dark:text-white">
          <span className="bg-yellow-400 dark:bg-yellow-500 px-4 text-black">FAQ</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* FAQ Item 1 */}
          <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow-lg dark:neo-shadow-white rotate-[0.5deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-black dark:text-white">
              Is it free?
            </h3>
            <p className="text-xl font-bold bg-cyan-400 dark:bg-cyan-500 inline-block px-2 neo-border border-black dark:border-white text-black">
              Yes. Zero cost. Full power.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow-lg dark:neo-shadow-white rotate-[-0.5deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-black dark:text-white">
              Data source?
            </h3>
            <p className="text-xl font-bold leading-snug text-black dark:text-white">
              We sync directly with <span className="underline decoration-4 decoration-yellow-400 dark:decoration-yellow-500">IGDB</span>. Accurate dates, covers, and details. No fake entries.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white dark:bg-black neo-border-thick dark:border-white p-8 neo-shadow-lg dark:neo-shadow-white rotate-[0.3deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-black dark:text-white">
              Steam Import?
            </h3>
            <p className="text-xl font-bold leading-snug text-black dark:text-white">
              Planned. We're working on the pipes. For now, manual entry keeps you disciplined.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
