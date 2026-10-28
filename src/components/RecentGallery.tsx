import React, { useState } from 'react';
import { Camera, Maximize2, MapPin, X } from 'lucide-react';
import { RECENT_GALLERY } from '../data/travelData';

export const RecentGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ id: string; title: string; location: string; image: string } | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="font-editorial italic text-teal-600 text-base sm:text-lg md:text-xl font-medium block mb-1">
            Make Your Tour More Pleasure
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recent Gallery
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500">
            Real snapshots captured by our expedition guests across high passes, hidden atolls, and sunset dunes.
          </p>
        </div>

        {/* Gallery Mosaic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {RECENT_GALLERY.map((item, index) => {
            const isTall = index === 0 || index === 4;
            const isLastOnSmall = index === 4;
            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/60 ${
                  isTall ? 'h-52 sm:h-80 md:h-96' : 'h-52 sm:h-72 md:h-80'
                } ${isLastOnSmall ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                  <div className="flex items-center gap-1 text-teal-300 text-xs font-semibold mb-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold truncate">{item.title}</h4>
                  
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300 pt-1.5 border-t border-white/20">
                    <span>Click to view</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-teal-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold">{activePhoto.title}</h3>
                <p className="text-xs sm:text-sm text-teal-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </p>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">TRAVEX Gallery</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
