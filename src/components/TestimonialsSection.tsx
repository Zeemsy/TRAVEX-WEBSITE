import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, TRUSTED_PARTNERS } from '../data/travelData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-editorial italic text-teal-600 text-lg md:text-xl font-medium block mb-1">
            Testimonial
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Clients Say About Us
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Real experiences from travelers who trusted TRAVEX to guide their once-in-a-lifetime journeys.
          </p>
        </div>

        {/* Testimonials Cards Grid matching moodboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {TESTIMONIALS.map((item, index) => {
            const isHighlighted = index === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isHighlighted
                    ? 'bg-gradient-to-b from-teal-50/90 to-white border-2 border-teal-500/40 shadow-xl scale-[1.02]'
                    : 'bg-slate-50/70 border border-slate-200/70 hover:border-teal-200 shadow-xs'
                }`}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-teal-100/60 text-teal-600 flex items-center justify-center">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Review Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6 italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 inline" />
                    </h4>
                    <p className="text-xs text-slate-500">
                      {item.role} · {item.location}
                    </p>
                    <span className="text-[11px] font-semibold text-teal-700 mt-0.5 block">
                      Tour: {item.tourName}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === i ? 'w-8 bg-teal-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Trusted Partners Banner matching moodboard */}
        <div className="pt-10 border-t border-slate-100 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-6">
            Official Travel Partners & Global Alliances
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUSTED_PARTNERS.map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-600 font-bold text-sm tracking-tight">
                <span className="text-xl">{partner.symbol}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
