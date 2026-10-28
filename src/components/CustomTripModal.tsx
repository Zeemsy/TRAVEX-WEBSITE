import React, { useState } from 'react';
import { X, Compass, Check, Calendar, Users, DollarSign, Send, ArrowRight } from 'lucide-react';

interface CustomTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomTripModal: React.FC<CustomTripModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [destination, setDestination] = useState('Maldives & Sri Lanka');
  const [duration, setDuration] = useState('10-14 days');
  const [budget, setBudget] = useState('$3,000 - $5,000 per person');
  const [guestCount, setGuestCount] = useState('2 adults (Honeymoon)');
  const [notes, setNotes] = useState('Looking for overwater bungalows, private boat excursions, and sunset candlelight beach dinners.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto sm:my-8 max-h-[96vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                Bespoke Expedition Design
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Plan Your Custom Dream Journey
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                Bespoke Proposal Requested!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Our Senior Expedition Architect has received your travel criteria. You will receive a private day-by-day blueprint and transparent quote within 12 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-3.5 sm:space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Preferred Destination / Region
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Ideal Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 bg-white focus:outline-none"
                  >
                    <option value="5-7 days">5 - 7 Days</option>
                    <option value="8-10 days">8 - 10 Days</option>
                    <option value="10-14 days">10 - 14 Days</option>
                    <option value="15+ days">15+ Days Expedition</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Estimated Budget / Person
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 bg-white focus:outline-none"
                  >
                    <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+ Luxury">$10,000+ Ultra Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Travel Party / Style
                </label>
                <input
                  type="text"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  placeholder="e.g. 2 Adults Honeymoon, Family with 2 kids..."
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Specific Wishes, Milestones or Activities
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-500 font-semibold hover:text-slate-800 text-center py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all min-h-[44px]"
                >
                  <span>Request Custom Itinerary</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
