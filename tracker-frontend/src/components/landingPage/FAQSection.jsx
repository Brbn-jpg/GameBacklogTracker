import React from "react";

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-black text-center uppercase mb-20 tracking-tighter">
          <span className="bg-yellow-400 px-4">FAQ</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* FAQ Item 1 */}
          <div className="bg-white neo-border-thick p-8 neo-shadow-lg rotate-[0.5deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
              Is it free?
            </h3>
            <p className="text-xl font-bold bg-cyan-400 inline-block px-2 neo-border">
              Yes. Zero cost. Full power.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white neo-border-thick p-8 neo-shadow-lg rotate-[-0.5deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
              Data source?
            </h3>
            <p className="text-xl font-bold leading-snug">
              We sync directly with <span className="underline decoration-4 decoration-yellow-400">IGDB</span>. Accurate dates, covers, and details. No fake entries.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white neo-border-thick p-8 neo-shadow-lg rotate-[0.3deg]">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
              Steam Import?
            </h3>
            <p className="text-xl font-bold leading-snug">
              Planned. We're working on the pipes. For now, manual entry keeps you disciplined.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
