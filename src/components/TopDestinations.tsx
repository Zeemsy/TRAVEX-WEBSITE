import React, { useState } from 'react';
import { MapPin, Star, ArrowUpRight, Compass } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { Destination } from '../data/travelData';

interface TopDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export const TopDestinations: React.FC<TopDestinationsProps> = ({
  onSelectDestination
}) => {
  const { destinations } = useTravel();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Maldives', 'Greece', 'Switzerland', 'Dubai', 'Thailand & Bali'];

  const filteredDestinations = activeTab === 'All'
    ? destinations
    : destinations.filter(d => d.name.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.toLowerCase().includes(d.name.toLowerCase()));

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="font-editorial italic text-teal-600 text-base sm:text-lg md:text-xl font-medium block mb-1">
              Top Destination
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top Destinations
            </h2>
          </div>

          {/* Interactive filter tabs with smooth mobile scroll */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-slate-100/80 rounded-xl sm:rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-lg sm:rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? 'bg-white text-teal-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
          {filteredDestinations.map((dest, idx) => {
            const isCenterpiece = dest.isCenterpiece || (filteredDestinations.length === 5 && idx === 0);
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.name)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 ${
                  isCenterpiece 
                    ? 'h-80 sm:h-[420px] lg:h-[460px] lg:col-span-1 lg:-translate-y-4 ring-2 ring-teal-500/20' 
                    : 'h-72 sm:h-88 lg:h-96'
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Visual Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating.toFixed(1)}</span>
                </div>

                {/* Arrow Action */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md group-hover:bg-teal-500 group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Card Content at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                  <div className="flex items-center gap-1.5 text-teal-300 text-xs font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.country}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1 group-hover:text-teal-200 transition-colors">
                    {dest.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>{dest.toursCount} Available Tours</span>
                    <span className="font-semibold text-teal-300">
                      From ${dest.startingPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
