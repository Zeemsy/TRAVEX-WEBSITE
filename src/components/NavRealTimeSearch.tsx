import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Compass, Star, Clock, Calendar, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TourPackage, Destination } from '../data/travelData';

interface NavRealTimeSearchProps {
  onSelectTour: (tour: TourPackage) => void;
  onSelectDestination: (destName: string) => void;
  fullWidthMobile?: boolean;
}

export const NavRealTimeSearch: React.FC<NavRealTimeSearchProps> = ({
  onSelectTour,
  onSelectDestination,
  fullWidthMobile = false
}) => {
  const { tours, destinations } = useTravel();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tours' | 'destinations'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      // Ctrl+K or Cmd+K shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Real-time filtering
  const trimmed = query.trim().toLowerCase();

  const filteredDestinations = useMemo(() => {
    if (!trimmed) return destinations.slice(0, 4);
    return destinations.filter((dest) => 
      dest.name.toLowerCase().includes(trimmed) ||
      dest.country.toLowerCase().includes(trimmed) ||
      dest.region.toLowerCase().includes(trimmed) ||
      dest.tagline.toLowerCase().includes(trimmed)
    );
  }, [destinations, trimmed]);

  const filteredTours = useMemo(() => {
    if (!trimmed) return tours.slice(0, 4);
    return tours.filter((tour) =>
      tour.title.toLowerCase().includes(trimmed) ||
      tour.country.toLowerCase().includes(trimmed) ||
      tour.city.toLowerCase().includes(trimmed) ||
      tour.type.toLowerCase().includes(trimmed) ||
      tour.highlights.some((h) => h.toLowerCase().includes(trimmed)) ||
      tour.description.toLowerCase().includes(trimmed)
    );
  }, [tours, trimmed]);

  const totalResults = filteredDestinations.length + filteredTours.length;

  const quickPills = [
    { label: 'Maldives', type: 'dest' },
    { label: 'Santorini', type: 'dest' },
    { label: 'Swiss Alps', type: 'dest' },
    { label: 'Dubai', type: 'dest' },
    { label: 'Luxury', type: 'type' },
    { label: 'Hiking', type: 'type' },
    { label: 'Adventure', type: 'type' },
  ];

  const handleTourClick = (tour: TourPackage) => {
    onSelectTour(tour);
    setIsOpen(false);
  };

  const handleDestClick = (destName: string) => {
    onSelectDestination(destName);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${fullWidthMobile ? 'w-full' : ''}`} ref={searchBoxRef}>
      {/* Trigger Button in Navbar or Mobile Menu */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-teal-50/60 border border-slate-200/80 transition-all cursor-pointer group text-xs font-semibold ${
          fullWidthMobile ? 'w-full justify-between bg-slate-50' : ''
        }`}
        title="Search destinations & tours (Cmd + K)"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
          <span className={`${fullWidthMobile ? 'inline' : 'hidden xl:inline'} text-slate-400 font-normal`}>
            Search tours, places...
          </span>
          <span className={`${fullWidthMobile ? 'hidden' : 'inline xl:hidden'} text-slate-500 font-medium`}>
            Search
          </span>
        </div>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
          ⌘K
        </kbd>
      </button>

      {/* Real-Time Search Overlay / Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-2 sm:pt-16 lg:pt-24 px-2 sm:px-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-2 sm:my-8 flex flex-col max-h-[92vh]">
            
            {/* Real-Time Input Bar */}
            <div className="p-3 sm:p-5 border-b border-slate-100 flex items-center gap-2.5 bg-slate-50/80 shrink-0">
              <Search className="w-5 h-5 text-teal-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, tours, styles..."
                className="w-full text-sm sm:text-base font-semibold text-slate-900 bg-transparent placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-200/80 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Close
              </button>
            </div>

            {/* Quick Filter Tags / Tabs */}
            <div className="px-3 sm:px-5 py-2.5 border-b border-slate-100 bg-white flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All ({totalResults})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tours')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'tours'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Tours ({filteredTours.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('destinations')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'destinations'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Destinations ({filteredDestinations.length})
                </button>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="hidden md:flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
                <span className="text-slate-400">Popular:</span>
                {quickPills.slice(0, 3).map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => setQuery(pill.label)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 font-medium transition-colors cursor-pointer"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Results Scrollable Area */}
            <div className="overflow-y-auto p-3 sm:p-5 space-y-5 flex-1">
              
              {/* Case 1: Empty Results */}
              {totalResults === 0 && (
                <div className="py-10 text-center text-slate-500">
                  <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">
                    No results found for "{query}"
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try searching for "Maldives", "Santorini", "Swiss Alps", or styles like "Luxury", "Hiking".
                  </p>
                </div>
              )}

              {/* Section 1: Destinations */}
              {(activeTab === 'all' || activeTab === 'destinations') && filteredDestinations.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      <span>Destinations</span>
                    </span>
                    <span className="text-[11px] text-teal-600 font-semibold">
                      {filteredDestinations.length} found
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredDestinations.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={() => handleDestClick(dest.name)}
                        className="group flex items-center gap-2.5 p-2 rounded-xl border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/40 transition-all cursor-pointer bg-white"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                              {dest.name}
                            </h4>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 shrink-0">
                              {dest.region}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {dest.country} • {dest.toursCount} Tours
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-all shrink-0 mr-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: Specific Tour Packages */}
              {(activeTab === 'all' || activeTab === 'tours') && filteredTours.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-teal-600" />
                      <span>Tour Packages</span>
                    </span>
                    <span className="text-[11px] text-teal-600 font-semibold">
                      {filteredTours.length} packages
                    </span>
                  </div>

                  <div className="space-y-2">
                    {filteredTours.map((tour) => (
                      <div
                        key={tour.id}
                        onClick={() => handleTourClick(tour)}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2.5 rounded-xl border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/30 transition-all cursor-pointer bg-white"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute top-0.5 left-0.5 text-[8px] font-bold px-1 py-0.2 rounded bg-black/60 text-white backdrop-blur-xs">
                              {tour.type}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                              {tour.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                              <span className="flex items-center gap-0.5 text-slate-600">
                                <MapPin className="w-3 h-3 text-teal-600" />
                                <span className="truncate max-w-[120px]">{tour.city}</span>
                              </span>
                              <span>•</span>
                              <span>{tour.durationDays}D</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span>{tour.rating}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-1.5 sm:pt-0 border-slate-100 shrink-0">
                          <div className="text-xs sm:text-sm font-extrabold text-teal-700">
                            ${tour.price}
                            <span className="text-[10px] font-normal text-slate-400">/person</span>
                          </div>
                          <span className="text-[11px] font-semibold text-teal-600 flex items-center gap-1">
                            <span>Book</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Bar */}
            <div className="p-3 px-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span className="text-[11px] truncate max-w-[180px] sm:max-w-none">
                Real-time <strong className="text-slate-700">TRAVEX</strong> database
              </span>
              <button
                type="button"
                onClick={() => {
                  onSelectDestination(query);
                  setIsOpen(false);
                }}
                className="font-bold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer flex items-center gap-1 text-xs shrink-0"
              >
                <span>View All In Tours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
