import React from 'react';
import HeroSection from '../components/tlc/HeroSection';
import ServiceAreaSection from '../components/tlc/ServiceAreaSection';
import ProjectProcessSection from '../components/tlc/ProjectProcessSection';
import NationalNetworkSection from '../components/tlc/NationalNetworkSection';
import ASCenterSection from '../components/tlc/ASCenterSection';
import KeyCustomersSection from '../components/tlc/KeyCustomersSection';
import CustomerSupportSection from '../components/tlc/CustomerSupportSection';
import ContactSection from '../components/tlc/ContactSection';
import LanguageNotice from '../components/ui/LanguageNotice';

const TlcDetailPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LanguageNotice />
      <ServiceAreaSection />
      <ProjectProcessSection />
      <NationalNetworkSection />
      <ASCenterSection />
      <KeyCustomersSection />
      <CustomerSupportSection />
      <ContactSection />
    </div>
  );
};

export default TlcDetailPage; 