import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Instagram, Facebook, Twitter, Linkedin, Lock } from 'lucide-react';
import { SANTORINI_IMAGE, SWISS_IMAGE, MALDIVES_IMAGE, DUBAI_IMAGE } from '../data/travelData';
import { TravexLogo } from './TravexLogo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramShots = [
    { title: 'Santorini Sunset', image: SANTORINI_IMAGE },
    { title: 'Swiss Alpine Lake', image: SWISS_IMAGE },
    { title: 'Maldives Overwater', image: MALDIVES_IMAGE },
    { title: 'Dubai Dunes', image: DUBAI_IMAGE },
  ];

  return (
    <footer className="bg-[#0b1b1e] text-slate-300 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-teal-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid matching moodboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-14 border-b border-slate-800">
          
          {/* Col 1: Professional Brand Logo & Bio */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            <TravexLogo variant="white" size="md" showTagline />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Specialized global expedition agency designing bespoke luxury escapes, high-altitude alpine treks, and cultural voyages across 6 continents.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#social" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-400 hover:text-teal-300 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-400 hover:text-teal-300 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-400 hover:text-teal-300 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-400 hover:text-teal-300 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">
              Useful Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">About TRAVEX</a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-teal-300 transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#tours" className="hover:text-teal-300 transition-colors">Tour Packages</a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  Instant Booking Portal
                </button>
              </li>
              <li>
                <a href="#guides" className="hover:text-teal-300 transition-colors">Our Certified Guides</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Get In Touch */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>102/B New Explorer Road, Salzburg, Austria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+431800872839" className="hover:text-white transition-colors">
                  +43 1 800 872 839
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:concierge@travex-expeditions.com" className="hover:text-white transition-colors">
                  concierge@travex.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon - Fri: 9:00 AM - 7:00 PM CET</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Instagram Stream */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase">
                Instagram Feed
              </h4>
              <span className="text-[11px] text-teal-400">@travex.travel</span>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {instagramShots.map((shot, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-800">
                  <img
                    src={shot.image}
                    alt={shot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Hidden Admin Padlock */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start text-center sm:text-left">
            <span>© 2026 TRAVEX Tour & Travel Booking Agency. All rights reserved.</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-slate-600 hover:text-teal-400 transition-colors p-1 rounded cursor-pointer inline-flex items-center"
                aria-label="Admin Access"
                title="Admin"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 hidden xs:inline">Accepted:</span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-400 font-mono text-[9px] sm:text-[10px] bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <span className="text-white font-bold">VISA</span>
              <span className="text-slate-600">·</span>
              <span className="text-white font-bold">MC</span>
              <span className="text-slate-600">·</span>
              <span className="text-white font-bold">AMEX</span>
              <span className="text-slate-600">·</span>
              <span className="text-white font-bold">Apple Pay</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
