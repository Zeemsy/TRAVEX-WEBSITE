import React from 'react';
import { CheckCircle2, Shield, Users, ArrowRight, Award, Compass, HeartHandshake } from 'lucide-react';
import { SWISS_IMAGE, SANTORINI_IMAGE, MALDIVES_IMAGE } from '../data/travelData';

interface PlanYourTripProps {
  onOpenCustomTrip: () => void;
  onOpenChat: () => void;
}

export const PlanYourTrip: React.FC<PlanYourTripProps> = ({
  onOpenCustomTrip,
  onOpenChat
}) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8FAFB] overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Arch and Circle shapes matching moodboard */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-sm sm:max-w-lg mx-auto overflow-hidden sm:overflow-visible py-4">
              
              {/* Main Arch-shaped photo */}
              <div className="w-56 sm:w-80 h-72 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10 mx-auto lg:ml-8">
                <img
                  src={SWISS_IMAGE}
                  alt="Swiss alpine hikers overlooking crystal lake"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Circular Secondary Photo (hidden on small mobile to prevent overlap) */}
              <div className="absolute top-8 left-0 sm:left-0 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-xl border-4 border-white z-20 hidden sm:block">
                <img
                  src={MALDIVES_IMAGE}
                  alt="Tropical Maldives ocean retreat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom offset landscape photo */}
              <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:right-6 w-36 sm:w-56 h-28 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20">
                <img
                  src={SANTORINI_IMAGE}
                  alt="Santorini coastal walk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute top-4 sm:top-1/2 right-2 sm:-right-6 sm:-translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 shadow-xl border border-slate-100 z-30 flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-base sm:text-xl">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-sm sm:text-xl font-extrabold text-slate-900">4.98 / 5</div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">Certified Excellence</div>
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-teal-200/30 rounded-full filter blur-3xl -z-10" />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="font-editorial italic text-teal-600 text-base sm:text-lg md:text-xl font-medium block mb-1">
                Let's Go Together
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Plan Your Trip <br />
                <span className="text-teal-700">With Us</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe travel is more than visiting landmarks—it is about feeling the heartbeat of a place. Our veteran expedition architects design tailored itineraries with hand-selected boutique stays, private transit, and licensed local storytellers.
              </p>
            </div>

            {/* Feature 1: Exclusive Trip */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Exclusive Bespoke Trips
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  Tailored private itineraries curated around your rhythm, secluded from tourist crowds with VIP early-access passes.
                </p>
              </div>
            </div>

            {/* Feature 2: Professional Guide */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-teal-200 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Certified Native Guide
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  Native guides with deep local heritage and medical certification, ensuring profound encounters and total peace of mind.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenCustomTrip}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer min-h-[44px]"
              >
                <span>Customize Custom Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
              >
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                <span>Talk With Specialist</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
