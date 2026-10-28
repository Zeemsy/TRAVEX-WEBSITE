import React from 'react';
import { X, Calendar, Clock, Users, Star, Check, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { TourPackage } from '../data/travelData';

interface TourDetailModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBookNow: (tour: TourPackage) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose, onBookNow }) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto sm:my-8 max-h-[96vh] sm:max-h-[92vh] flex flex-col">
        
        {/* Header with Photo Hero */}
        <div className="relative h-48 sm:h-72 w-full shrink-0">
          <img
            src={tour.image}
            alt={tour.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-teal-500 text-slate-950 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                {tour.continent} · {tour.type}
              </span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] sm:text-xs">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{tour.rating}</span>
                <span className="text-slate-300">({tour.reviewsCount})</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {tour.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{tour.city}, {tour.country}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          
          {/* Key Facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{tour.durationDays}D / {tour.durationDays - 1}N</span>
            </div>
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 block">Group Size</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">Max {tour.maxGroup} Guests</span>
            </div>
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 block">Departure</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">{tour.nextDeparture}</span>
            </div>
            <div>
              <span className="text-[10px] sm:text-xs text-slate-400 block">Pricing</span>
              <span className="text-xs sm:text-sm font-bold text-teal-700">${tour.price} / person</span>
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">Expedition Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {tour.description} Hand-crafted with an emphasis on authentic connections, boutique properties, and licensed native specialists who reveal cultural dimensions inaccessible to ordinary tour buses.
            </p>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">Day-by-Day Itinerary</h3>
            <div className="space-y-2.5 sm:space-y-3">
              {tour.itinerary.map((item) => (
                <div key={item.day} className="flex items-start gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-50 text-teal-700 font-extrabold flex items-center justify-center shrink-0 text-xs sm:text-sm">
                    D{item.day}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5">Included in Your Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.included.map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-3.5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block">Package Starting At</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">${tour.price}</span>
              <span className="text-xs text-slate-500">/ traveler</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[44px]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(tour);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all min-h-[44px]"
            >
              <span>Book Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
