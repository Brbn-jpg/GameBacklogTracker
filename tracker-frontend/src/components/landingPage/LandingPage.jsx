import React from "react";
import MainLayout from "../layout/MainLayout";
import Hero from "./Hero";
import SocialProof from "./SocialProof";
import Features from "./Features";
import FAQSection from "./FAQSection";

const LandingPage = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <SocialProof />
      <FAQSection />
    </MainLayout>
  );
};

export default LandingPage;
