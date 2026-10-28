import React, { useState } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, ArrowRight } from 'lucide-react';
import { TravexLogo } from './TravexLogo';
import { useTravel } from '../context/TravelContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  const { adminLogin } = useTravel();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-[fade-in_0.2s_ease-out] my-auto">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-5 sm:p-6 text-white text-center relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex justify-center mb-2.5 sm:mb-3">
            <TravexLogo variant="light" size="sm" showTagline={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Administrator Access</span>
          </div>

          <h3 className="text-lg font-bold text-white mt-2">
            Admin Authentication
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Please enter your administrative password to proceed
          </p>
        </div>

        {/* Form Body - Invisible password */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Invalid password. Access denied.</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Admin Password
            </label>
            
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono tracking-widest"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer mt-2"
          >
            <span>Unlock Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center text-[11px] text-slate-400 gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Secure administrative gateway</span>
          </div>
        </form>

      </div>
    </div>
  );
};
