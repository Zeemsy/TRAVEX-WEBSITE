import React, { useState } from 'react';
import { Star, Award, Globe, Mail, MessageCircle, X } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { Guide } from '../data/travelData';

interface TourGuidesProps {
  onContactGuide: (guide: Guide) => void;
}

export const TourGuides: React.FC<TourGuidesProps> = ({ onContactGuide }) => {
  const { guides } = useTravel();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <section id="guides" className="py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-editorial italic text-teal-600 text-lg md:text-xl font-medium block mb-1">
            Meet With Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Certified Tour Guides
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Passionate native experts certified in first aid, cultural history, and wilderness preservation.
          </p>
        </div>

        {/* 4 Guide Cards matching moodboard layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="group bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                <img
                  src={guide.photo}
                  alt={guide.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-teal-300 font-medium">
                    {guide.specialty}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{guide.rating}</span>
                </div>
              </div>

              {/* Guide Info */}
              <div className="text-center flex-1 flex flex-col justify-between px-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {guide.role}
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>{guide.experienceYears} Years Exp</span>
                    <span className="text-slate-300">·</span>
                    <span>{guide.toursCount}+ Tours</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="w-full py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors cursor-pointer"
                  >
                    View Bio & Creds
                  </button>
                  <button
                    onClick={() => onContactGuide(guide)}
                    className="p-2 text-slate-600 hover:text-teal-600 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors"
                    title={`Contact ${guide.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Guide Details Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setSelectedGuide(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedGuide.photo}
                alt={selectedGuide.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover shadow-sm"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedGuide.name}</h3>
                <p className="text-xs text-teal-700 font-semibold">{selectedGuide.role}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{selectedGuide.rating} / 5.0</span>
                  <span>({selectedGuide.toursCount} tours guided)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Specialty & Field Expertise:</h4>
                <p>{selectedGuide.specialty}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Languages Spoken:</h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedGuide.languages.map((lang) => (
                    <span key={lang} className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Certifications:</h4>
                <p>Wilderness First Responder (WFR), UIAA Mountain Guide Member, EcoTourism Heritage Ambassador.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => {
                  const guideToContact = selectedGuide;
                  setSelectedGuide(null);
                  onContactGuide(guideToContact);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Request As Private Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
