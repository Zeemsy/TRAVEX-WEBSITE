import React from 'react';
import { Ship, Footprints, Wind, Compass, MapPin, ArrowRight } from 'lucide-react';
import { TOUR_CATEGORIES, TourCategory } from '../data/travelData';

interface TourCategoriesProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export const TourCategories: React.FC<TourCategoriesProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship':
        return <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />;
      case 'Footprints':
        return <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />;
      case 'Wind':
        return <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />;
      case 'Compass':
        return <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />;
      case 'MapPin':
      default:
        return <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="font-editorial italic text-teal-600 text-base sm:text-lg md:text-xl font-medium block mb-1">
            Wonderful Place For You
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tour Categories
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500">
            Choose your ideal mode of discovery from relaxing luxury cruises to high-altitude alpine passes.
          </p>
        </div>

        {/* 5 Distinctive Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {TOUR_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.title)}
              className="group text-left bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-3 border border-slate-200/70 shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col cursor-pointer active:scale-98"
            >
              {/* Image Frame with curved top as in moodboard */}
              <div className="relative h-36 sm:h-52 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-4 bg-slate-100">
                <img
                  src={category.image}
                  alt={category.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Floating category icon */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs">
                  {getIcon(category.iconName)}
                </div>

                {/* Tour count */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[10px] sm:text-xs font-semibold text-white drop-shadow-sm">
                  {category.tourCount} Tours
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="px-1 sm:px-2 pb-1 sm:pb-2 flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-1">
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors truncate">
                    {category.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-normal truncate block">
                    {category.subtitle}
                  </span>
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
