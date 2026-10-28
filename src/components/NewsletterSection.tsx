import React, { useState } from 'react';
import { Mail, Check, Sparkles, Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white relative overflow-hidden">
      {/* Decorative blurred glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Text Info */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Members Exclusive Offer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Get Updated The Latest Newsletter
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Subscribe to receive confidential seasonal flight promotions, private island availability alerts, and a <strong>$100 voucher</strong> for your first journey.
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:max-w-md">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-200 text-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Welcome to the TRAVEX Circle!</p>
                  <p className="text-xs text-teal-300 mt-0.5">Use voucher code <strong>WANDERLUST20</strong> at checkout for $100 off.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer active:scale-95"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-slate-400 mt-2 text-center lg:text-left">
              No spam, ever. Unsubscribe with a single click anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
