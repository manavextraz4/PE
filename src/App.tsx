/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CustomerAuthProvider } from './context/CustomerAuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { QuickActionBar } from './components/QuickActionBar.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { BrandsSection } from './components/BrandsSection.tsx';
import { ProductCategories } from './components/ProductCategories.tsx';
import { PartRequirementFinder } from './components/PartRequirementFinder.tsx';
import { WholesaleRetailSection } from './components/WholesaleRetailSection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { HowToEnquire } from './components/HowToEnquire.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingMobileBar } from './components/FloatingMobileBar.tsx';
import { FadeInUp } from './components/FadeInUp.tsx';

export default function App() {
  const [selectedCategoryPart, setSelectedCategoryPart] = useState('');

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategoryPart(categoryName);
  };

  const handleSelectWholesale = () => {
    // When wholesale is selected from the wholesale card
    setSelectedCategoryPart('Wholesale Order Enquiry');
  };

  return (
    <CustomerAuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
        {/* Sticky Header */}
        <Header />

        <main className="flex-1 overflow-x-hidden">
          {/* Hero Section */}
          <Hero />

          {/* Quick Action Bar */}
          <FadeInUp threshold={0.1}>
            <QuickActionBar />
          </FadeInUp>

          {/* About Section */}
          <FadeInUp threshold={0.12}>
            <AboutSection />
          </FadeInUp>

          {/* Authorized Dealership Brands */}
          <FadeInUp threshold={0.1}>
            <BrandsSection onSelectBrand={handleSelectCategory} />
          </FadeInUp>

          {/* Product Categories */}
          <FadeInUp threshold={0.1}>
            <ProductCategories onSelectCategory={handleSelectCategory} />
          </FadeInUp>

          {/* Interactive Part Requirement Finder */}
          <FadeInUp threshold={0.1}>
            <PartRequirementFinder initialPart={selectedCategoryPart} />
          </FadeInUp>

          {/* Wholesale & Retail Dual Capabilities */}
          <FadeInUp threshold={0.12}>
            <WholesaleRetailSection onSelectWholesale={handleSelectWholesale} />
          </FadeInUp>

          {/* Why Choose Preeti Enterprises */}
          <FadeInUp threshold={0.12}>
            <WhyChooseUs />
          </FadeInUp>

          {/* 3-Step Buying / Enquiry Guide */}
          <FadeInUp threshold={0.12}>
            <HowToEnquire />
          </FadeInUp>

          {/* Store Location with Interactive Google Map */}
          <FadeInUp threshold={0.12}>
            <LocationSection />
          </FadeInUp>

          {/* Contact Section & Form */}
          <FadeInUp threshold={0.1}>
            <ContactSection />
          </FadeInUp>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Call & WhatsApp Bar for Mobile */}
        <FloatingMobileBar />
      </div>
    </CustomerAuthProvider>
  );
}
