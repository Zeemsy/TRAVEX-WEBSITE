import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Compass, Sparkles, User, ArrowRight } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';

interface LiveChatConciergeProps {
  isOpen: boolean;
  onToggle: () => void;
  onBookTour: (tour: TourPackage) => void;
}

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
  tourSuggestion?: TourPackage;
}

export const LiveChatConcierge: React.FC<LiveChatConciergeProps> = ({
  isOpen,
  onToggle,
  onBookTour
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'concierge',
      text: 'Hello traveler! Welcome to TRAVEX. I am Clara, your expedition concierge. How can I help customize your dream tour today?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Best season for Maldives?',
    'Show Switzerland hiking tour',
    'Do you provide private guides?',
    'Any active discount codes?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Contextual automated response
    setTimeout(() => {
      let reply = '';
      let suggestedTour: TourPackage | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('maldives') || lower.includes('beach') || lower.includes('overwater')) {
        reply = 'The Maldives is magnificent from November through April when the dry monsoon brings crystal calm seas and 30-meter water clarity for snorkeling with manta rays!';
        suggestedTour = TOUR_PACKAGES.find(p => p.country === 'Maldives');
      } else if (lower.includes('swiss') || lower.includes('switzerland') || lower.includes('hike') || lower.includes('alps')) {
        reply = 'Our Switzerland Alpine Wonders expedition covers Zermatt, the Matterhorn, and Jungfraujoch with panoramic first-class Swiss rail passes included.';
        suggestedTour = TOUR_PACKAGES.find(p => p.id === 'pkg-switzerland');
      } else if (lower.includes('greece') || lower.includes('santorini')) {
        reply = 'Greece is our #1 honeymoon and cultural tour! You get private catamaran sailing in Oia, volcanic wine tastings, and boutique cave suites.';
        suggestedTour = TOUR_PACKAGES.find(p => p.id === 'pkg-greece');
      } else if (lower.includes('dubai') || lower.includes('desert') || lower.includes('luxury')) {
        reply = 'Dubai offers world-class luxury! Our package includes private Maybach transfers, Burj Al Arab access, and a starlight desert camp.';
        suggestedTour = TOUR_PACKAGES.find(p => p.id === 'pkg-dubai');
      } else if (lower.includes('code') || lower.includes('discount') || lower.includes('voucher') || lower.includes('promo')) {
        reply = 'You can apply early-bird promo code "WANDERLUST20" during checkout to receive an instant 20% savings on any booking today!';
      } else if (lower.includes('guide') || lower.includes('certified')) {
        reply = 'All our tours include certified native guides with Wilderness First Responder certification, speaking English, German, French, and local dialects.';
      } else {
        reply = 'Thank you for reaching out! Every TRAVEX journey is customizable. You can browse our most popular packages or chat with us anytime.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'concierge',
          text: reply,
          timestamp: 'Just now',
          tourSuggestion: suggestedTour
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="mb-2.5 sm:mb-4 w-[calc(100vw-1.5rem)] sm:w-96 h-[76vh] sm:h-[520px] max-h-[580px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-[fade-in_0.2s_ease-out]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/30 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">TRAVEX Concierge</h4>
                <p className="text-[10px] sm:text-[11px] text-teal-300">Active · Instant reply</p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="bg-slate-50 px-2.5 sm:px-3 py-2 border-b border-slate-200/60 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[10px] sm:text-[11px] font-medium bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-600 px-2 sm:px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#f8fafb]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/80 shadow-xs'
                  }`}
                >
                  {msg.text}

                  {/* Contextual tour card inside chat */}
                  {msg.tourSuggestion && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                      <img
                        src={msg.tourSuggestion.image}
                        alt={msg.tourSuggestion.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-teal-700 uppercase block">
                          {msg.tourSuggestion.country}
                        </span>
                        <div className="text-[11px] font-bold text-slate-900 truncate">
                          {msg.tourSuggestion.title}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-700">
                          ${msg.tourSuggestion.price}
                        </div>
                      </div>
                      <button
                        onClick={() => onBookTour(msg.tourSuggestion!)}
                        className="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold rounded-lg shrink-0 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-400 text-xs bg-white px-3 py-2 rounded-full w-16 border border-slate-200 shadow-xs">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 sm:p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about tours, dates..."
              className="flex-1 p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 sm:p-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white rounded-xl transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Concierge Action Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Toggle Live Chat Concierge"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <>
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
          </>
        )}
      </button>

    </div>
  );
};
