import React from "react";
import Navbar from "../common/Navbar";
import Hero from "./Hero";
import SocialProof from "./SocialProof";
import Features from "./Features";
import FAQSection from "./FAQSection";
import Footer from "../common/Footer";

const LandingPage = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
