import React from 'react';
import HeroSection from '../components/illutech/HeroSection';
import ProductCategorySection from '../components/illutech/ProductCategorySection';
import ExpertCurationSection from '../components/illutech/ExpertCurationSection';
import CustomizedServiceSection from '../components/illutech/CustomizedServiceSection';
import CustomerConvenienceSection from '../components/illutech/CustomerConvenienceSection';
import CustomerReviewSection from '../components/illutech/CustomerReviewSection';
import EventBenefitSection from '../components/illutech/EventBenefitSection';
import ContactShoppingSection from '../components/illutech/ContactShoppingSection';

const IllutechDetailPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCategorySection />
      <ExpertCurationSection />
      <CustomizedServiceSection />
      <CustomerConvenienceSection />
      <CustomerReviewSection />
      <EventBenefitSection />
      <ContactShoppingSection />
    </div>
  );
};

export default IllutechDetailPage; 