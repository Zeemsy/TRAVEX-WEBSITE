import React from 'react';
import { Award, Heart, CheckCircle2, Users } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '12',
      unit: 'Years',
      label: 'Years Experience',
      subtext: 'Pioneering luxury & adventure expeditions since 2014',
      icon: <Award className="w-5 h-5 text-teal-600" />
    },
    {
      value: '97%',
      unit: '',
      label: 'Retention Rate',
      subtext: 'Guest return rate and direct client referrals',
      icon: <Heart className="w-5 h-5 text-rose-500" />
    },
    {
      value: '8K',
      unit: 'Tours',
      label: 'Tour Completed',
      subtext: 'Guided departures across 42 countries worldwide',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />
    },
    {
      value: '19K',
      unit: 'Guests',
      label: 'Happy Travellers',
      subtext: 'Mindful travelers who explored the globe with us',
      icon: <Users className="w-5 h-5 text-cyan-600" />
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="flex flex-col items-center text-center p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/70 border border-slate-200/60 hover:border-teal-300 hover:bg-teal-50/20 transition-all duration-300 group"
            >
              {/* Circular ring counter */}
              <div className="relative w-20 h-20 sm:w-28 sm:h-32 rounded-full border-2 border-dashed border-teal-300 group-hover:border-teal-500 flex flex-col items-center justify-center p-1 sm:p-2 mb-3 sm:mb-4 bg-white shadow-xs group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-[9px] sm:text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                    {stat.unit}
                  </span>
                )}
              </div>

              <h4 className="text-xs sm:text-base lg:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {stat.label}
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 max-w-[180px] line-clamp-2 sm:line-clamp-none">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
