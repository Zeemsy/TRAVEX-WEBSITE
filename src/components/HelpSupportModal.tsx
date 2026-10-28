import React, { useState } from 'react';
import { X, HelpCircle, Mail, Phone, ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  type: 'faq' | 'support';
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [supportSent, setSupportSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const faqs = [
    {
      q: 'What is included in TRAVEX tour packages?',
      a: 'All our curated packages include boutique 4-star and 5-star hotel/villa accommodations, internal high-speed transfers (ferries, scenic trains, domestic flights), daily gourmet breakfast, certified native tour guides, and skip-the-line entrance tickets to all itinerary attractions.'
    },
    {
      q: 'What is the deposit and cancellation policy?',
      a: 'We offer a 100% flexible booking guarantee. A 20% deposit reserves your spot. Full payment is due 30 days prior to departure. You may cancel up to 21 days before departure for a full refund.'
    },
    {
      q: 'Are solo travelers welcome in group tours?',
      a: 'Absolutely! Approximately 40% of our travelers embark solo. We offer single-supplement private rooms or room-matching with travelers of the same gender upon request.'
    },
    {
      q: 'Do you arrange international airline tickets?',
      a: 'Yes, our air concierge desk can issue discounted partner fares with Emirates, Qatar Airways, Lufthansa, Singapore Airlines, and Delta.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto sm:my-8 max-h-[96vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              {type === 'faq' ? <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mail className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-teal-400 uppercase tracking-wider block truncate">
                {type === 'faq' ? 'Frequently Asked Questions' : 'Concierge Support'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {type === 'faq' ? 'Traveler Policies' : '24/7 Support Desk'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {type === 'faq' ? (
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 sm:p-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer gap-2"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 sm:p-8">
              {supportSent ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Message Dispatched</h4>
                  <p className="text-xs text-slate-500">
                    Your inquiry has been routed to our duty concierge. We typically respond within 15 minutes.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSupportSent(true);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      How Can We Help?
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all min-h-[44px]"
                  >
                    Send Message to Concierge
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
