import React, { useState } from 'react';
import { Search, MapPin, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/travelData';
import { DepartureCalendarPicker } from './DepartureCalendarPicker';

interface HeroSectionProps {
  onSearch: (filters: { destination: string; type: string; duration: string; departureDate?: string }) => void;
  onExploreServices: () => void;
  onExploreTours: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreServices,
  onExploreTours
}) => {
  const [destination, setDestination] = useState('');
  const [tourType, setTourType] = useState('All');
  const [duration, setDuration] = useState('All');
  const [departureDate, setDepartureDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, type: tourType, duration, departureDate });
  };

  return (
    <section id="home" className="relative pt-4 sm:pt-6 pb-16 sm:pb-24 lg:pb-36 overflow-hidden">
      {/* Background with measured scrim for high WCAG readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Natural wonder tropical lagoon wanderlust expedition"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Multi-stage gradient scrim for optical legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 lg:pt-24">
        <div className="max-w-2xl text-white">
          
          {/* Large headline matching moodboard: "Natural Wonder Of The World" */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white mb-4 sm:mb-6 drop-shadow-md">
            Natural Wonder <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-white bg-clip-text text-transparent">
              Of The World
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
            Discover breathtaking landscapes, secluded island atolls, and immersive cultural odysseys tailored with 5-star concierge care and licensed local guides.
          </p>

          {/* Action CTAs: Full width on mobile, inline on tablet+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <button
              onClick={onExploreTours}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer min-h-[46px]"
            >
              <span>Explore Tours</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreServices}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 active:scale-95 transition-all cursor-pointer min-h-[46px]"
            >
              <span>Our Services</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>100% Certified Tour Operators</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">★★★★★</span>
              <span>4.9/5 from 19,000+ Travellers</span>
            </div>
          </div>

        </div>

        {/* Floating Search & Booking Filter Box with Departure Window Calendar */}
        <div className="mt-8 sm:mt-14 lg:mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white/98 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center"
          >
            {/* Field 1: Destination */}
            <div className="space-y-1 pb-2 sm:pb-0 border-b sm:border-b-0 sm:border-r border-slate-200/80 sm:pr-4">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Destination</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer py-1"
              >
                <option value="">Where to travel?</option>
                <option value="Maldives">Maldives Islands</option>
                <option value="Greece">Greece (Santorini)</option>
                <option value="Switzerland">Switzerland (Alps)</option>
                <option value="Dubai">Dubai (UAE)</option>
                <option value="Bali">Bali (Indonesia)</option>
              </select>
            </div>

            {/* Field 2: Type */}
            <div className="space-y-1 pb-2 sm:pb-0 border-b sm:border-b-0 sm:border-r border-slate-200/80 sm:pr-4">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Tour Type</span>
              </label>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full text-sm font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer py-1"
              >
                <option value="All">All Tour Styles</option>
                <option value="Luxury">Luxury & Overwater</option>
                <option value="Hiking">Hiking & Alpine</option>
                <option value="Cultural">Cultural & Heritage</option>
                <option value="Adventure">Adventure & Island</option>
              </select>
            </div>

            {/* Field 3: Departure Window (Real-time Calendar) */}
            <div className="space-y-1 pb-2 sm:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200/80 lg:pr-4">
              <DepartureCalendarPicker
                selectedDate={departureDate}
                onChange={(dateStr) => setDepartureDate(dateStr)}
                label="Departure Window"
                placeholder="Pick preferable day"
                align="center"
              />
            </div>

            {/* Field 4: Search Button */}
            <div className="pt-1 sm:pt-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-600/20 active:scale-95 transition-all text-sm whitespace-nowrap cursor-pointer min-h-[46px]"
              >
                <Search className="w-4 h-4" />
                <span>Search Tours</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
