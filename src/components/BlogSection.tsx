import React, { useState } from 'react';
import { Calendar, MessageSquare, ArrowRight, Clock, User, X } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { BlogPost } from '../data/travelData';

export const BlogSection: React.FC = () => {
  const { blogPosts } = useTravel();
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="font-editorial italic text-teal-600 text-lg md:text-xl font-medium block mb-1">
              Blog and Article
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              News & Articles From TRAVEX
            </h2>
          </div>

          <button
            onClick={() => setSelectedArticle(blogPosts[0] || null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 uppercase tracking-wider py-2 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>See More Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Articles Grid matching moodboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta: Date & Comments */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{post.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                      <span>{post.commentsCount} Comments</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedArticle(post)}
                    className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Read More link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400">{post.readTime}</span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-2 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-600" />
                By {selectedArticle.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {selectedArticle.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {selectedArticle.readTime}
              </span>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900">
                {selectedArticle.summary}
              </p>
              <p>
                When organizing long-range itineraries, timing and local insight are everything. Rather than rushing through overcrowded observation decks, seasoned travelers seek out twilight timings, private chartered watercraft, and locally-sourced dining experiences.
              </p>
              <p>
                At TRAVEX, every departure date is selected to align with optimal natural weather windows, cultural festivals, and reduced seasonal crowd densities.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Share this article with fellow travelers</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-500"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
