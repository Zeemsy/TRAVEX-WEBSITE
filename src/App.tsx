/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TravelProvider, useTravel } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OurServices } from './components/OurServices';
import { TourCategories } from './components/TourCategories';
import { TopDestinations } from './components/TopDestinations';
import { PlanYourTrip } from './components/PlanYourTrip';
import { PopularTours } from './components/PopularTours';
import { RecentGallery } from './components/RecentGallery';
import { StatsSection } from './components/StatsSection';
import { TourGuides } from './components/TourGuides';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TourDetailModal } from './components/TourDetailModal';
import { CustomTripModal } from './components/CustomTripModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { LiveChatConcierge } from './components/LiveChatConcierge';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TourPackage, Guide } from './data/travelData';

function MainApp() {
  const { tours, isAdminLoggedIn } = useTravel();

  // Modal states
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<TourPackage | null>(null);
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<TourPackage | null>(null);
  const [customTripOpen, setCustomTripOpen] = useState(false);
  const [helpModalConfig, setHelpModalConfig] = useState<{ isOpen: boolean; type: 'faq' | 'support' }>({
    isOpen: false,
    type: 'faq'
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Admin states
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Filter params passed from Hero search to Tour list
  const [searchParams, setSearchParams] = useState<{ destination: string; type: string; duration: string; departureDate?: string } | null>(null);

  const handleHeroSearch = (filters: { destination: string; type: string; duration: string; departureDate?: string }) => {
    setSearchParams(filters);
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryTitle: string) => {
    let mappedType = 'All';
    if (categoryTitle.toLowerCase().includes('cruis')) mappedType = 'Cruises';
    else if (categoryTitle.toLowerCase().includes('hik')) mappedType = 'Hiking';
    else if (categoryTitle.toLowerCase().includes('air')) mappedType = 'Luxury';
    else if (categoryTitle.toLowerCase().includes('wild')) mappedType = 'Adventure';
    else if (categoryTitle.toLowerCase().includes('walk') || categoryTitle.toLowerCase().includes('cultur')) mappedType = 'Cultural';

    setSearchParams({ destination: '', type: mappedType, duration: 'All' });
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestination = (destName: string) => {
    setSearchParams({ destination: destName, type: 'All', duration: 'All' });
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTourFromSearch = (tour: TourPackage) => {
    setSelectedTourForDetail(tour);
  };

  const handleContactGuide = (_guide: Guide) => {
    setIsChatOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedTourForBooking(tours[0] || null);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full flex flex-col bg-[#FBFDFD] text-slate-800 antialiased font-sans overflow-x-hidden">
      
      {/* Main Navigation Bar with Real-Time Search & HOME, ABOUT, SERVICES, DESTINATION, TOURS, GUIDES, BLOG */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenChat={() => setIsChatOpen(true)}
        activeSection="home"
        onSelectTour={handleSelectTourFromSearch}
        onSelectDestination={handleSelectDestination}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 3. Hero Section (Explore Tours & Our Services CTAs) */}
        <HeroSection
          onSearch={handleHeroSearch}
          onExploreServices={() => {
            const servicesEl = document.getElementById('services');
            if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreTours={() => {
            const toursEl = document.getElementById('tours');
            if (toursEl) toursEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Our Services Section */}
        <OurServices
          onOpenChat={() => setIsChatOpen(true)}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 5. Tour Categories */}
        <TourCategories onSelectCategory={handleSelectCategory} />

        {/* 6. Top Destinations Showcase */}
        <TopDestinations
          onSelectDestination={handleSelectDestination}
        />

        {/* 7. Plan Your Trip With Us / About Us */}
        <PlanYourTrip
          onOpenCustomTrip={() => setCustomTripOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* 8. Most Popular Tour Packages */}
        <PopularTours
          onBookTour={(tour) => setSelectedTourForBooking(tour)}
          onViewTourDetails={(tour) => setSelectedTourForDetail(tour)}
          filterParams={searchParams}
        />

        {/* 9. Recent Gallery Mosaic */}
        <RecentGallery />

        {/* 10. Quantitative Stats Counters */}
        <StatsSection />

        {/* 11. Certified Tour Guides */}
        <TourGuides onContactGuide={handleContactGuide} />

        {/* 12. Testimonials & Trusted Partners */}
        <TestimonialsSection />

        {/* 13. News & Blog Articles */}
        <BlogSection />

        {/* 14. Newsletter Subscriber Box */}
        <NewsletterSection />
      </main>

      {/* 15. Rich Footer */}
      <Footer
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 16. Interactive Modals & Floating Drawers */}
      {selectedTourForBooking && (
        <BookingModal
          tour={selectedTourForBooking}
          onClose={() => setSelectedTourForBooking(null)}
        />
      )}

      {selectedTourForDetail && (
        <TourDetailModal
          tour={selectedTourForDetail}
          onClose={() => setSelectedTourForDetail(null)}
          onBookNow={(tour) => {
            setSelectedTourForDetail(null);
            setSelectedTourForBooking(tour);
          }}
        />
      )}

      <CustomTripModal
        isOpen={customTripOpen}
        onClose={() => setCustomTripOpen(false)}
      />

      <HelpSupportModal
        isOpen={helpModalConfig.isOpen}
        type={helpModalConfig.type}
        onClose={() => setHelpModalConfig({ isOpen: false, type: 'faq' })}
      />

      {/* 17. 24/7 Live Tour Concierge Chat Widget */}
      <LiveChatConcierge
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onBookTour={(tour) => {
          setIsChatOpen(false);
          setSelectedTourForBooking(tour);
        }}
      />

      {/* 18. Staff Admin Login Modal (Password: Rich234) */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={() => {
          setAdminLoginModalOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {/* 19. Administrative Dashboard Fullscreen CMS */}
      {adminDashboardOpen && (
        <AdminDashboard onClose={() => setAdminDashboardOpen(false)} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <TravelProvider>
      <MainApp />
    </TravelProvider>
  );
}
