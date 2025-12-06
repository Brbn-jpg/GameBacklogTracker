import React from "react";
import Navbar from "../common/Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "../common/Footer";

const LandingPage = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
