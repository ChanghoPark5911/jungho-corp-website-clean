import React from 'react';
import HeroSection from '../components/texcom/HeroSection';
import BusinessAreaSection from '../components/texcom/BusinessAreaSection';
import CoreStrengthsSection from '../components/texcom/CoreStrengthsSection';
import ProductServiceSection from '../components/texcom/ProductServiceSection';
import InnovationTechnologySection from '../components/texcom/InnovationTechnologySection';
import KeyAchievementsSection from '../components/texcom/KeyAchievementsSection';
import CustomerSupportSection from '../components/texcom/CustomerSupportSection';
import ContactSection from '../components/texcom/ContactSection';

const TexcomDetailPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BusinessAreaSection />
      <CoreStrengthsSection />
      <ProductServiceSection />
      <InnovationTechnologySection />
      <KeyAchievementsSection />
      <CustomerSupportSection />
      <ContactSection />
    </div>
  );
};

export default TexcomDetailPage; 