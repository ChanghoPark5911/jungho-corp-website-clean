import React from 'react';
import HeroSection from '../components/clarus/HeroSection';
import CoreTechnologySection from '../components/clarus/CoreTechnologySection';
import ProductLineupSection from '../components/clarus/ProductLineupSection';
import RnDStatusSection from '../components/clarus/RnDStatusSection';
import GlobalPresenceSection from '../components/clarus/GlobalPresenceSection';
import ProjectPortfolioSection from '../components/clarus/ProjectPortfolioSection';
import TechnicalSupportSection from '../components/clarus/TechnicalSupportSection';
import ContactSection from '../components/clarus/ContactSection';

const ClarusDetailPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CoreTechnologySection />
      <ProductLineupSection />
      <RnDStatusSection />
      <GlobalPresenceSection />
      <ProjectPortfolioSection />
      <TechnicalSupportSection />
      <ContactSection />
    </div>
  );
};

export default ClarusDetailPage; 