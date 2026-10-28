import React, { useState } from 'react';
import { X, Calendar, Users, ShieldCheck, Check, Sparkles, ArrowRight, Printer, Share2, Compass, CreditCard, CircleDollarSign, ArrowLeftRight } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TravexLogo } from './TravexLogo';
import { DepartureCalendarPicker } from './DepartureCalendarPicker';
import { TourPackage } from '../data/travelData';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // exchange rate from 1 USD
  flag: string;
  note: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
    flag: '🇺🇸',
    note: 'Base USD Rate'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92,
    flag: '🇪🇺',
    note: '1 USD ≈ €0.92 (ECB reference rate)'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79,
    flag: '🇬🇧',
    note: '1 USD ≈ £0.79 (Bank of England ref)'
  }
};

interface BookingModalProps {
  tour: TourPackage | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ tour, onClose }) => {
  if (!tour) return null;

  const { addBooking } = useTravel();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState('2026-05-18');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('Standard Deluxe');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Currency Converter State
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  
  // Add-ons
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    airportTransfer: true,
    diningPlan: false,
    travelInsurance: true,
    photoPack: false
  });

  // Traveler info
  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@voyageur.com');
  const [phone, setPhone] = useState('+1 (555) 392-8812');
  const [specialRequests, setSpecialRequests] = useState('Quiet room on high floor, vegetarian meal preference on flights.');

  const [bookingRef, setBookingRef] = useState('TRX-74921');

  // USD Calculations
  const basePricePerPersonUSD = tour.price;
  const subtotalUSD = (adults * basePricePerPersonUSD) + (children * (basePricePerPersonUSD * 0.7));
  
  let addonTotalUSD = 0;
  if (addons.airportTransfer) addonTotalUSD += 120;
  if (addons.diningPlan) addonTotalUSD += 350 * (adults + children);
  if (addons.travelInsurance) addonTotalUSD += 85 * (adults + children);
  if (addons.photoPack) addonTotalUSD += 220;

  let roomFeeUSD = 0;
  if (roomType === 'Panoramic Villa') roomFeeUSD = 250;
  else if (roomType === 'Presidential Residence') roomFeeUSD = 500;

  const preDiscountTotalUSD = subtotalUSD + addonTotalUSD + roomFeeUSD;
  const discountAmountUSD = preDiscountTotalUSD * (discountPercent / 100);
  const grandTotalUSD = Math.round(preDiscountTotalUSD - discountAmountUSD);

  // Currency Conversion Helpers
  const convertFromUSD = (usdAmount: number, targetCurr: CurrencyCode = currency): number => {
    return Math.round(usdAmount * CURRENCIES[targetCurr].rate);
  };

  const formatPrice = (usdAmount: number, targetCurr: CurrencyCode = currency): string => {
    const config = CURRENCIES[targetCurr];
    const converted = Math.round(usdAmount * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  const currentGrandTotal = convertFromUSD(grandTotalUSD);
  const currentDiscountAmount = convertFromUSD(discountAmountUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WANDERLUST20') {
      setDiscountPercent(20);
      setPromoMessage('20% Early Bird Discount applied successfully!');
    } else {
      setPromoMessage('Invalid voucher code. Try "WANDERLUST20"');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'TRX-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(randomCode);

    // Save directly to admin database & localStorage with selected currency
    addBooking({
      bookingRef: randomCode,
      tourId: tour.id,
      tourTitle: tour.title,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      departureDate: selectedDate,
      guestsCount: adults + children,
      totalPrice: currentGrandTotal,
      currency: currency,
      status: 'Confirmed',
      notes: specialRequests ? `${specialRequests} [Currency: ${currency}]` : `[Currency: ${currency}]`
    });

    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto sm:my-8 max-h-[96vh] sm:max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="sm:hidden shrink-0">
              <TravexLogo variant="white" size="sm" showTagline={false} />
            </div>
            <div className="hidden sm:block shrink-0">
              <TravexLogo variant="white" size="sm" />
            </div>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-teal-400 uppercase tracking-wider block truncate">
                Official Booking Checkout
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                {tour.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress - Responsive labels */}
        <div className="bg-slate-50 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold shrink-0">
          <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 1 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] sm:text-xs shrink-0 ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span className="hidden sm:inline">Dates & Guests</span>
            <span className="sm:hidden text-[11px]">Dates</span>
          </div>
          <div className="w-4 sm:w-8 h-px bg-slate-300" />
          <div className={`flex items-center gap-1.5 sm:gap-2 ${step >= 2 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] sm:text-xs shrink-0 ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span className="hidden sm:inline">Guest Details</span>
            <span className="sm:hidden text-[11px]">Details</span>
          </div>
          <div className="w-4 sm:w-8 h-px bg-slate-300" />
          <div className={`flex items-center gap-1.5 sm:gap-2 ${step === 3 ? 'text-teal-700 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] sm:text-xs shrink-0 ${step === 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span className="hidden sm:inline">Confirmed Voucher</span>
            <span className="sm:hidden text-[11px]">Voucher</span>
          </div>
        </div>

        {/* Currency Converter Tool Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
              <CircleDollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  Currency Converter
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-none mt-0.5">
                {CURRENCIES[currency].note}
              </p>
            </div>
          </div>

          {/* Toggle buttons between USD, EUR, GBP */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 shadow-inner w-full sm:w-auto justify-between sm:justify-start">
            {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((cCode) => {
              const isSelected = currency === cCode;
              const c = CURRENCIES[cCode];
              return (
                <button
                  key={cCode}
                  type="button"
                  onClick={() => setCurrency(cCode)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title={`Convert pricing to ${c.name} (${c.symbol})`}
                >
                  <span className="text-xs sm:text-sm">{c.flag}</span>
                  <span>{cCode}</span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                    ({c.symbol})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="overflow-y-auto flex-1">
          {/* STEP 1: Dates, Guests & Add-ons */}
          {step === 1 && (
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Departure Date Calendar Picker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Departure Window (Preferable Day)
                  </label>
                  <div className="p-1 rounded-xl border border-slate-200 bg-white">
                    <DepartureCalendarPicker
                      selectedDate={selectedDate}
                      onChange={(dateStr) => setSelectedDate(dateStr || '2026-05-18')}
                      label="Preferable Vacation Day"
                      placeholder="Pick your departure date"
                      durationDays={tour.durationDays}
                      align="left"
                    />
                  </div>
                </div>

                {/* Room Tier */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Suite Accommodation Tier
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-teal-500 bg-white focus:outline-none"
                  >
                    <option value="Standard Deluxe">Signature Suite (Included)</option>
                    <option value="Panoramic Villa">Panoramic Villa (+{formatPrice(250)})</option>
                    <option value="Presidential Residence">Penthouse (+{formatPrice(500)})</option>
                  </select>
                </div>
              </div>

              {/* Guest Counters */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Users className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">Adult Travelers (Age 12+)</div>
                    <div className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="font-semibold text-teal-700">{formatPrice(basePricePerPersonUSD)}</span> per person
                      {currency !== 'USD' && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          (≈ ${basePricePerPersonUSD} USD)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="text-base font-extrabold text-slate-900 w-6 text-center tabular-nums">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Curated Add-ons */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Expedition Add-ons & Travel Protection
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <label className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.airportTransfer}
                      onChange={(e) => setAddons({ ...addons, airportTransfer: e.target.checked })}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="font-bold text-slate-800">
                        Private Airport Chauffeur (+{formatPrice(120)})
                      </div>
                      <div className="text-slate-500 text-[11px]">VIP airport greeting & Mercedes transfer</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.travelInsurance}
                      onChange={(e) => setAddons({ ...addons, travelInsurance: e.target.checked })}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="font-bold text-slate-800">
                        Comprehensive Medical & Cancel Protection (+{formatPrice(85)}/p)
                      </div>
                      <div className="text-slate-500 text-[11px]">100% refund guarantee & evacuation</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Promo Code Strip */}
              <div className="pt-1">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Have promo code? (Try: WANDERLUST20)"
                    className="flex-1 p-2 sm:p-2.5 rounded-xl border border-slate-200 text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-xs mt-1.5 ${discountPercent > 0 ? 'text-teal-600 font-semibold' : 'text-rose-500'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Price Breakdown Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500 block">Total Estimated Cost</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase border border-slate-200">
                      {currency}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                      {formatPrice(grandTotalUSD)}
                    </span>
                    {currency !== 'USD' && (
                      <span className="text-xs text-slate-400 tabular-nums">
                        (≈ ${grandTotalUSD.toLocaleString()} USD)
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="text-xs text-teal-600 font-bold">
                        Saved {formatPrice(discountAmountUSD)} (20% OFF)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all min-h-[44px]"
                >
                  <span>Continue To Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details Form */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="p-4 sm:p-8 space-y-4 sm:space-y-5">
              {/* Quick summary of package & converted price */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Selected Package:</span>{' '}
                  <span className="font-bold text-slate-800">{tour.title}</span>
                  <span className="text-slate-400 block text-[11px]">
                    {adults} Guests · {roomType} · Departure: {selectedDate}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Locked Total ({currency}):</span>
                  <span className="text-base sm:text-lg font-extrabold text-teal-700 tabular-nums">
                    {formatPrice(grandTotalUSD)}
                  </span>
                  {currency !== 'USD' && (
                    <span className="text-[11px] text-slate-400 block">
                      (≈ ${grandTotalUSD.toLocaleString()} USD)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Lead Traveler Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Email Confirmation Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Dietary Preferences or Special Room Requests
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-200 text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Notice */}
              <div className="p-3 sm:p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center gap-2.5 sm:gap-3">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 shrink-0" />
                <div className="text-xs text-teal-950">
                  <p className="font-bold">Zero-Risk Reservation Guarantee & FX Lock</p>
                  <p className="text-teal-800 text-[11px] sm:text-xs">
                    No immediate charge today. Your quoted rate in <strong>{currency} ({formatPrice(grandTotalUSD)})</strong> is locked against currency fluctuations.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[44px]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all min-h-[44px]"
                >
                  <span>Confirm Voucher</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmed Voucher View */}
          {step === 3 && (
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2.5">
                  <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Booking Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your reservation voucher has been sent to <strong className="text-slate-700">{email}</strong>
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-slate-300 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-teal-700 uppercase tracking-widest block">
                      TRAVEX OFFICIAL BOARDING PASS
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">{tour.title}</h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase">Booking Ref:</span>
                    <div className="text-sm sm:text-base font-mono font-bold text-slate-900">{bookingRef}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 sm:py-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Lead Guest:</span>
                    <span className="font-bold text-slate-800 truncate block">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Departure:</span>
                    <span className="font-bold text-slate-800">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Guests:</span>
                    <span className="font-bold text-slate-800">{adults} Adults {children > 0 ? `, ${children} Kids` : ''}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Due:</span>
                    <span className="font-bold text-teal-700 text-sm sm:text-base tabular-nums block">
                      {formatPrice(grandTotalUSD)} {currency}
                    </span>
                    {currency !== 'USD' && (
                      <span className="text-[10px] text-slate-400 block">
                        (≈ ${grandTotalUSD.toLocaleString()} USD)
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-slate-500 gap-2">
                  <span>Included: Stays, Certified Guide, Meals & Transport</span>
                  <span className="font-mono text-slate-500">
                    [FX LOCKED: 1 USD = {CURRENCIES[currency].rate} {currency}]
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors min-h-[44px]"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
