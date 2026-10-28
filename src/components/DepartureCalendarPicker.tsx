import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, X, Sparkles, Clock } from 'lucide-react';

interface DepartureCalendarPickerProps {
  selectedDate: string; // YYYY-MM-DD format
  onChange: (dateStr: string, formattedDisplay: string) => void;
  label?: string;
  minDate?: string; // YYYY-MM-DD
  placeholder?: string;
  durationDays?: number;
  align?: 'left' | 'right' | 'center';
}

export const DepartureCalendarPicker: React.FC<DepartureCalendarPickerProps> = ({
  selectedDate,
  onChange,
  label = 'Departure Date',
  minDate,
  placeholder = 'Select departure day',
  durationDays = 7,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Parse today and current view month
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const effectiveMinDate = minDate || todayStr;

  // Initial view year/month based on selectedDate or today
  const initialDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : today;
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Navigate months
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days in month
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun

  // Helpers
  const formatDateString = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const formatDisplay = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelectDay = (day: number) => {
    const dateStr = formatDateString(viewYear, viewMonth, day);
    onChange(dateStr, formatDisplay(dateStr));
    setIsOpen(false);
  };

  // Quick preset handlers
  const handlePresetSelect = (daysFromNow: number) => {
    const target = new Date();
    target.setDate(today.getDate() + daysFromNow);
    const dateStr = formatDateString(target.getFullYear(), target.getMonth(), target.getDate());
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
    onChange(dateStr, formatDisplay(dateStr));
    setIsOpen(false);
  };

  // Calendar Content Node
  const renderCalendarContent = () => (
    <div className="space-y-3">
      {/* Header Bar: Month/Year navigation */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-sm font-bold text-slate-900 block leading-tight">
            {monthNames[viewMonth]} {viewYear}
          </span>
          <span className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider">
            Select Departure Day
          </span>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          title="Next Month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Choice Presets */}
      <div className="py-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-100 text-[11px]">
        <button
          type="button"
          onClick={() => handlePresetSelect(5)}
          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 whitespace-nowrap transition-colors cursor-pointer font-medium"
        >
          Next Weekend
        </button>
        <button
          type="button"
          onClick={() => handlePresetSelect(14)}
          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 whitespace-nowrap transition-colors cursor-pointer font-medium"
        >
          In 2 Weeks
        </button>
        <button
          type="button"
          onClick={() => handlePresetSelect(30)}
          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 whitespace-nowrap transition-colors cursor-pointer font-medium"
        >
          Next Month
        </button>
      </div>

      {/* Day of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center py-1 text-[11px] font-bold text-slate-400">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Empty padding cells for first week */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8 mx-auto" />
        ))}

        {/* Calendar Day Buttons */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const currentDayStr = formatDateString(viewYear, viewMonth, day);
          const isSelected = selectedDate === currentDayStr;
          const isToday = todayStr === currentDayStr;
          const isPast = currentDayStr < effectiveMinDate;

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => handleSelectDay(day)}
              className={`h-8 w-8 mx-auto text-xs font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-600 text-white font-extrabold shadow-sm scale-105'
                  : isPast
                  ? 'text-slate-300 cursor-not-allowed line-through opacity-40'
                  : isToday
                  ? 'border border-teal-500 text-teal-700 hover:bg-teal-50'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer Info Strip */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-teal-700 font-medium truncate max-w-[190px]">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{durationDays} Days / {durationDays - 1} N Expedition</span>
        </span>
        <button
          type="button"
          onClick={() => {
            onChange('', '');
            setIsOpen(false);
          }}
          className="text-slate-400 hover:text-slate-600 cursor-pointer font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
        aria-label="Pick preferable departure date"
      >
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 group-hover:text-teal-600 transition-colors">
            <CalendarIcon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
          <div className="text-sm font-semibold text-slate-800 truncate mt-0.5">
            {selectedDate ? (
              <span className="text-teal-900 font-bold">{formatDisplay(selectedDate)}</span>
            ) : (
              <span className="text-slate-400 font-normal">{placeholder}</span>
            )}
          </div>
        </div>
      </button>

      {/* Calendar Overlay for Mobile (<sm) and Popover for Tablet/Desktop (sm+) */}
      {isOpen && (
        <>
          {/* Mobile centered modal view to guarantee 100% viewport fit on all phones */}
          <div className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-[fade-in_0.15s_ease-out]">
            <div
              ref={modalRef}
              className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 relative"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
              {renderCalendarContent()}
            </div>
          </div>

          {/* Desktop inline dropdown popover */}
          <div
            className={`hidden sm:block absolute top-full z-50 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 animate-[fade-in_0.15s_ease-out] ${
              align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
            }`}
          >
            {renderCalendarContent()}
          </div>
        </>
      )}
    </div>
  );
};
