import React, { useState } from 'react';
import { Star, Clock, Users, ArrowRight, Check, Compass, Sparkles } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TourPackage } from '../data/travelData';

interface PopularToursProps {
  onBookTour: (tour: TourPackage) => void;
  onViewTourDetails: (tour: TourPackage) => void;
  filterParams?: { destination: string; type: string; duration: string; departureDate?: string } | null;
}

export const PopularTours: React.FC<PopularToursProps> = ({
  onBookTour,
  onViewTourDetails,
  filterParams
}) => {
  const { tours: contextTours } = useTravel();
  const [selectedType, setSelectedType] = useState<string>('All');

  // Filter logic including hero search params and local type filter
  const tours = contextTours.filter((tour) => {
    if (selectedType !== 'All' && tour.type !== selectedType) {
      return false;
    }
    if (filterParams) {
      if (filterParams.destination) {
        const destMatch = 
          tour.country.toLowerCase().includes(filterParams.destination.toLowerCase()) ||
          tour.city.toLowerCase().includes(filterParams.destination.toLowerCase()) ||
          tour.title.toLowerCase().includes(filterParams.destination.toLowerCase());
        if (!destMatch) return false;
      }
      if (filterParams.type && filterParams.type !== 'All') {
        if (tour.type !== filterParams.type) return false;
      }
      if (filterParams.duration && filterParams.duration !== 'All') {
        if (filterParams.duration === 'short' && tour.durationDays > 5) return false;
        if (filterParams.duration === 'medium' && (tour.durationDays < 6 || tour.durationDays > 8)) return false;
        if (filterParams.duration === 'long' && tour.durationDays < 9) return false;
      }
    }
    return true;
  });

  const tourTypes = ['All', 'Luxury', 'Hiking', 'Cultural', 'Adventure'];

  return (
    <section id="tours" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Moodboard Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-editorial italic text-teal-600 text-lg md:text-xl font-medium block mb-1">
            Best Place For You
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Most Popular Tour Packages
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Handcrafted expeditions with guaranteed departures, transparent pricing, boutique handpicked stays, and licensed regional guides.
          </p>

          {/* Type filters */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
            {tourTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {type === 'All' ? 'All Expeditions' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Cards Grid matching moodboard layout */}
        {tours.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No tours match your current search filters</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your destination or duration filters, or chat with our live concierge to create a custom trip.
            </p>
            <button
              onClick={() => setSelectedType('All')}
              className="mt-4 px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {tour.badge && (
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-teal-800 shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>{tour.badge}</span>
                    </div>
                  )}

                  {/* Duration Tag */}
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-teal-300" />
                    <span>{tour.durationDays} Days</span>
                  </div>

                  {/* Group Size */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-teal-300" />
                    <span>Max {tour.maxGroup}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Destination and Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-teal-700 tracking-wide uppercase text-[11px]">
                        {tour.country}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{tour.rating}</span>
                        <span className="text-slate-400">({tour.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onViewTourDetails(tour)}
                      className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1 cursor-pointer"
                      title={tour.title}
                    >
                      {tour.title}
                    </h3>

                    {/* Highlights bullets */}
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      {tour.highlights.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Book Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Per Person</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                          ${tour.price}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            ${tour.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewTourDetails(tour)}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onBookTour(tour)}
                        className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
