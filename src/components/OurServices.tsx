import React, { useState } from 'react';
import { Plane, Hotel, Headphones, ShieldPlus, Luggage, ArrowRight, Check, X, Send } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TravelService } from '../data/travelData';

interface OurServicesProps {
  onOpenChat: () => void;
  onOpenBooking: () => void;
}

export const OurServices: React.FC<OurServicesProps> = ({ onOpenChat, onOpenBooking }) => {
  const { services } = useTravel();
  const [activeModal, setActiveModal] = useState<TravelService | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-teal-600" />;
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-teal-600" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-teal-600" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-5 h-5 text-teal-600" />;
      case 'Luggage':
      default:
        return <Luggage className="w-5 h-5 text-teal-600" />;
    }
  };

  const handleCtaClick = (service: TravelService) => {
    if (service.modalType === 'support') {
      onOpenChat();
    } else {
      setFormSubmitted(false);
      setActiveModal(service);
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-editorial italic text-teal-600 text-lg md:text-xl font-medium block mb-1">
            What We Offer At TRAVEX
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Premium Travel Services
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            From discounted global flights and boutique hotel suites to 24/7 live concierge, medical protection, and lost baggage compensation.
          </p>
        </div>

        {/* 5 Distinct Service Cards with High Quality Imagery & CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isWide = index === 3 || index === 4;
            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between ${
                  isWide && index === 3 ? 'lg:col-span-1 lg:ml-auto' : ''
                }`}
              >
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Service Icon Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>

                  {/* Title on image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
                      {service.tagline}
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-white drop-shadow-xs">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Perks List */}
                    <ul className="space-y-2 text-xs text-slate-700 mb-6">
                      {service.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="font-medium">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleCtaClick(service)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Service Detail & Inquiry Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto sm:my-8 max-h-[96vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative h-36 sm:h-44 w-full overflow-hidden shrink-0">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/30" />
              
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
                  TRAVEX Service Concierge
                </span>
                <h3 className="text-2xl font-bold">{activeModal.title}</h3>
              </div>
            </div>

            {/* Modal Form */}
            <div className="p-4 sm:p-8 overflow-y-auto flex-1">
              {formSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Request Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our specialist for <strong>{activeModal.title}</strong> is reviewing your inquiry. We will contact you within 15 minutes with available options and lowest quote.
                  </p>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {activeModal.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 uppercase block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="Sarah Jenkins"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 uppercase block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        defaultValue="sarah@example.com"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {activeModal.modalType === 'flight' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 uppercase block mb-1">Departure City</label>
                        <input
                          type="text"
                          defaultValue="London (LHR)"
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 uppercase block mb-1">Destination</label>
                        <input
                          type="text"
                          defaultValue="Maldives (MLE)"
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeModal.modalType === 'hotel' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 uppercase block mb-1">Destination / Resort</label>
                        <input
                          type="text"
                          defaultValue="Santorini, Greece"
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 uppercase block mb-1">Room Tier</label>
                        <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 bg-white">
                          <option>5-Star Luxury Suite</option>
                          <option>Overwater Bungalow</option>
                          <option>Alpine Mountain Chalet</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {(activeModal.modalType === 'care' || activeModal.modalType === 'baggage') && (
                    <div>
                      <label className="font-bold text-slate-700 uppercase block mb-1">Coverage Scope</label>
                      <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 bg-white">
                        <option>Worldwide Comprehensive Protection (Recommended)</option>
                        <option>Single Trip Travel Care Plan</option>
                        <option>Annual Multi-Trip Expedition Cover</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="text-slate-500 hover:text-slate-800 font-semibold text-xs py-2 text-center"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer min-h-[44px]"
                    >
                      <span>Submit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
