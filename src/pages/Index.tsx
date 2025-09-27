
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedPools from '@/components/FeaturedPools';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-jungle-950">
      <HeroSection />
      <FeaturedPools />
      <HowItWorks />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
