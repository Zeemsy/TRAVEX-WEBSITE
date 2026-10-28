import React, { useState } from 'react';
import { Menu, X, Calendar, MessageSquare } from 'lucide-react';
import { TravexLogo } from './TravexLogo';
import { NavRealTimeSearch } from './NavRealTimeSearch';
import { TourPackage } from '../data/travelData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
  activeSection: string;
  onSelectTour: (tour: TourPackage) => void;
  onSelectDestination: (destName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenChat,
  activeSection,
  onSelectTour,
  onSelectDestination
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation features requested: HOME, ABOUT, SERVICES, DESTINATION, TOURS, GUIDES, AND BLOG
  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'DESTINATION', href: '#destinations' },
    { label: 'TOURS', href: '#tours' },
    { label: 'GUIDES', href: '#guides' },
    { label: 'BLOG', href: '#blog' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-8">
          
          {/* Zone 1: Professional TRAVEX Logo (Compact on mobile, full on desktop) */}
          <a 
            href="#home" 
            className="group flex items-center whitespace-nowrap shrink-0 min-w-0"
          >
            <div className="sm:hidden">
              <TravexLogo variant="dark" size="sm" showTagline={false} />
            </div>
            <div className="hidden sm:block">
              <TravexLogo variant="dark" size="md" showTagline />
            </div>
          </a>

          {/* Zone 2: Navigation Links: HOME, ABOUT, SERVICES, DESTINATION, TOURS, GUIDES, BLOG */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold tracking-wider text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive 
                      ? 'text-teal-600 font-bold' 
                      : 'hover:text-teal-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Search, Booking Action, & Mobile Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Real-Time Search Bar */}
            <NavRealTimeSearch
              onSelectTour={onSelectTour}
              onSelectDestination={onSelectDestination}
            />

            {/* Book A Tour CTA Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Book A Tour</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* Mobile menu trigger with touch-friendly tap target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown drawer with full responsiveness */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile search bar trigger */}
          <div className="pb-3 border-b border-slate-100">
            <NavRealTimeSearch
              onSelectTour={(t) => {
                setMobileMenuOpen(false);
                onSelectTour(t);
              }}
              onSelectDestination={(d) => {
                setMobileMenuOpen(false);
                onSelectDestination(d);
              }}
              fullWidthMobile
            />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold tracking-wider text-slate-700 hover:text-teal-600 hover:bg-teal-50/60 active:bg-teal-100/60 transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 hover:bg-teal-100 active:bg-teal-200 rounded-xl cursor-pointer min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span>Live Tour Concierge Chat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
