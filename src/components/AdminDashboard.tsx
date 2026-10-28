import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  MapPin,
  Users,
  BookOpen,
  CalendarCheck,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RotateCcw,
  ExternalLink,
  LogOut,
  Check,
  AlertTriangle,
  Search,
  DollarSign,
  Clock,
  Star,
  Eye
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TravexLogo } from './TravexLogo';
import { TourPackage, Destination, Guide, BlogPost, TravelService, BookingRecord } from '../data/travelData';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const {
    tours,
    addTour,
    updateTour,
    deleteTour,
    services,
    updateService,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    guides,
    addGuide,
    updateGuide,
    deleteGuide,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    bookings,
    updateBookingStatus,
    deleteBooking,
    adminLogout,
    resetToDefaults
  } = useTravel();

  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'services' | 'destinations' | 'guides' | 'bookings' | 'blog'>('tours');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals for Create / Edit
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);
  const [isNewTour, setIsNewTour] = useState(false);

  const [editingService, setEditingService] = useState<TravelService | null>(null);

  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isNewDestination, setIsNewDestination] = useState(false);

  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [isNewGuide, setIsNewGuide] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations for Overview
  const totalRevenue = bookings.reduce((sum, b) => (b.status !== 'Cancelled' ? sum + b.totalPrice : sum), 0);

  // --- Handlers for Tours ---
  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;
    if (isNewTour) {
      addTour(editingTour);
      showToast(`Tour "${editingTour.title}" added successfully!`);
    } else {
      updateTour(editingTour);
      showToast(`Tour "${editingTour.title}" updated successfully!`);
    }
    setEditingTour(null);
    setIsNewTour(false);
  };

  const handleDeleteTour = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the tour "${title}"?`)) {
      deleteTour(id);
      showToast(`Tour "${title}" deleted.`);
    }
  };

  // --- Handlers for Services ---
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService);
    showToast(`Service "${editingService.title}" updated successfully!`);
    setEditingService(null);
  };

  // --- Handlers for Destinations ---
  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDestination) return;
    if (isNewDestination) {
      addDestination(editingDestination);
      showToast(`Destination "${editingDestination.name}" added!`);
    } else {
      updateDestination(editingDestination);
      showToast(`Destination "${editingDestination.name}" updated!`);
    }
    setEditingDestination(null);
    setIsNewDestination(false);
  };

  const handleDeleteDestination = (id: string, name: string) => {
    if (window.confirm(`Delete destination "${name}"?`)) {
      deleteDestination(id);
      showToast(`Destination "${name}" removed.`);
    }
  };

  // --- Handlers for Guides ---
  const handleSaveGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuide) return;
    if (isNewGuide) {
      addGuide(editingGuide);
      showToast(`Guide "${editingGuide.name}" added!`);
    } else {
      updateGuide(editingGuide);
      showToast(`Guide "${editingGuide.name}" updated!`);
    }
    setEditingGuide(null);
    setIsNewGuide(false);
  };

  const handleDeleteGuide = (id: string, name: string) => {
    if (window.confirm(`Delete guide "${name}"?`)) {
      deleteGuide(id);
      showToast(`Guide "${name}" removed.`);
    }
  };

  // --- Handlers for Blog ---
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    if (isNewBlog) {
      addBlogPost(editingBlog);
      showToast(`Article "${editingBlog.title}" published!`);
    } else {
      updateBlogPost(editingBlog);
      showToast(`Article "${editingBlog.title}" updated!`);
    }
    setEditingBlog(null);
    setIsNewBlog(false);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      deleteBlogPost(id);
      showToast(`Article "${title}" removed.`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website tours, services, destinations and guides to factory defaults? Any custom edits will be erased.')) {
      resetToDefaults();
      showToast('All website content reset to factory defaults.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[60] bg-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-[fade-in_0.2s_ease-out]">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar of Admin Dashboard */}
      <header className="h-16 sm:h-18 bg-slate-950 border-b border-slate-800 px-3 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="sm:hidden">
            <TravexLogo variant="light" size="sm" showTagline={false} />
          </div>
          <div className="hidden sm:block">
            <TravexLogo variant="light" size="md" showTagline />
          </div>
          <div className="hidden sm:block h-6 w-px bg-slate-800" />
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            Admin CMS Panel
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Reset to default content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Live Website</span>
            <span className="sm:hidden">Live Site</span>
          </button>

          <button
            onClick={() => {
              adminLogout();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            title="Log Out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Dashboard Body with Sidebar + Main View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-56 bg-slate-950/70 border-r border-slate-800 p-4 shrink-0 hidden md:flex flex-col justify-between">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('tours')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'tours' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tour Packages ({tours.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'services' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Our Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('destinations')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'destinations' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Destinations ({destinations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'guides' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Tour Guides ({guides.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'bookings' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left cursor-pointer ${
                activeTab === 'blog' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Articles ({blogPosts.length})</span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <div className="font-bold text-white mb-0.5">Live Changes</div>
            <p>Every edit immediately saves to localStorage & reflects on the live website.</p>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900">
          
          {/* Mobile Tabs Switcher */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-slate-800">
            {(['tours', 'services', 'destinations', 'guides', 'bookings', 'blog'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap ${
                  activeTab === tab ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: TOURS MANAGEMENT */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Manage Tour Packages</h2>
                  <p className="text-xs text-slate-400">Edit prices, durations, descriptions, or add new expeditions</p>
                </div>

                <button
                  onClick={() => {
                    setEditingTour({
                      id: 'pkg-' + Date.now(),
                      title: 'New Exotic Tour Expedition',
                      country: 'Iceland',
                      city: 'Reykjavik & Waterfalls',
                      continent: 'Europe',
                      type: 'Adventure',
                      price: 1100,
                      originalPrice: 1350,
                      durationDays: 8,
                      rating: 5.0,
                      reviewsCount: 1,
                      image: '/src/assets/images/dest_swiss_alps_lake_1793005140361.jpg',
                      badge: 'New Departure',
                      highlights: ['Geothermal lagoons', 'Glacier ice cave walk', 'Aurora borealis watch'],
                      itinerary: [
                        { day: 1, title: 'Arrival in Reykjavik', desc: 'Welcome dinner & orientation.' }
                      ],
                      included: ['All 4-Star boutique chalets', 'Private super-jeep transfer', 'Certified glaciologist guide'],
                      maxGroup: 10,
                      nextDeparture: 'July 15, 2026',
                      description: 'An unforgettable glacial & volcanic trek through untouched wilderness.',
                      coordinates: { x: 45, y: 25, lat: 64.1466, lng: -21.9426 }
                    });
                    setIsNewTour(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Tour</span>
                </button>
              </div>

              {/* Tours Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Tour / Package</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4">Price / Person</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {tours.map((tour) => (
                        <tr key={tour.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={tour.image}
                                alt={tour.title}
                                className="w-12 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <span className="font-bold text-white block text-sm">{tour.title}</span>
                                <span className="text-[11px] text-teal-400 font-medium">{tour.type} · {tour.badge || 'Standard'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {tour.city}, {tour.country}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {tour.durationDays} Days
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-teal-300 text-sm">
                            ${tour.price}
                            {tour.originalPrice && (
                              <span className="text-slate-500 line-through text-xs ml-1.5 font-normal">
                                ${tour.originalPrice}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-amber-400 font-bold">
                            ★ {tour.rating} <span className="text-slate-500 text-[10px]">({tour.reviewsCount})</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingTour({ ...tour });
                                  setIsNewTour(false);
                                }}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-300 transition-colors cursor-pointer"
                                title="Edit Tour"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTour(tour.id, tour.title)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition-colors cursor-pointer"
                                title="Remove Tour"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Manage What We Offer At TRAVEX</h2>
                <p className="text-xs text-slate-400">Update services titles, descriptions, perks, and CTA button labels</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                          {service.tagline}
                        </span>
                        <button
                          onClick={() => setEditingService({ ...service })}
                          className="px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600 text-teal-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit Card</span>
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{service.description}</p>

                      <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                        {service.perks.map((p, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-teal-400" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>CTA: <strong className="text-slate-300">{service.ctaLabel}</strong></span>
                      <span className="font-mono">ID: {service.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DESTINATIONS MANAGEMENT */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Manage Featured Destinations</h2>
                  <p className="text-xs text-slate-400">Add, edit, or remove top world destination cards</p>
                </div>

                <button
                  onClick={() => {
                    setEditingDestination({
                      id: 'dest-' + Date.now(),
                      name: 'Kyoto & Tokyo',
                      country: 'Japan',
                      region: 'East Asia',
                      image: '/src/assets/images/hero_tropical_wanderlust_1793005139345.jpg',
                      toursCount: 120,
                      startingPrice: 1100,
                      tagline: 'Ancient Shrines & Modern Neon',
                      rating: 4.95
                    });
                    setIsNewDestination(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div key={dest.id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                    <div className="relative h-40">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <span className="text-[10px] text-teal-300 font-bold uppercase">{dest.country}</span>
                        <h4 className="text-lg font-bold">{dest.name}</h4>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="text-xs text-slate-400 mb-3">
                        <p className="italic">"{dest.tagline}"</p>
                        <div className="mt-2 flex items-center justify-between text-slate-300">
                          <span>{dest.toursCount} Tours Listed</span>
                          <span className="font-bold text-teal-400">From ${dest.startingPrice}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingDestination({ ...dest });
                            setIsNewDestination(false);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDestination(dest.id, dest.name)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GUIDES MANAGEMENT */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Manage Certified Guides</h2>
                  <p className="text-xs text-slate-400">Update staff bios, ratings, and specialties</p>
                </div>

                <button
                  onClick={() => {
                    setEditingGuide({
                      id: 'guide-' + Date.now(),
                      name: 'Marco Bellini',
                      role: 'Senior Mediterranean Maritime Guide',
                      experienceYears: 8,
                      rating: 4.95,
                      toursCount: 180,
                      languages: ['English', 'Italian', 'Spanish'],
                      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                      specialty: 'Coastal Navigation & Historical Architecture'
                    });
                    setIsNewGuide(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {guides.map((guide) => (
                  <div key={guide.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
                    <div>
                      <img src={guide.photo} alt={guide.name} className="w-full h-44 rounded-xl object-cover mb-3" />
                      <h4 className="font-bold text-white text-base">{guide.name}</h4>
                      <p className="text-xs text-teal-400">{guide.role}</p>
                      <p className="text-[11px] text-slate-400 mt-2">{guide.specialty}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-bold">★ {guide.rating}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEditingGuide({ ...guide });
                            setIsNewGuide(false);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGuide(guide.id, guide.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS & INQUIRIES */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Guest Reservations & Inquiries</h2>
                  <p className="text-xs text-slate-400">Total Pipeline: ${totalRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Guest Info</th>
                      <th className="py-3 px-4">Tour Package</th>
                      <th className="py-3 px-4">Departure</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings.map((bkg) => (
                      <tr key={bkg.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-mono font-bold text-teal-400">
                          {bkg.bookingRef}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-white block">{bkg.customerName}</span>
                          <span className="text-[11px] text-slate-400">{bkg.customerEmail}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-medium">
                          {bkg.tourTitle}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {bkg.departureDate} ({bkg.guestsCount} Guests)
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          {bkg.currency === 'EUR' ? '€' : bkg.currency === 'GBP' ? '£' : '$'}
                          {bkg.totalPrice.toLocaleString()}{' '}
                          {bkg.currency && (
                            <span className="text-[10px] text-teal-400 font-sans font-medium">
                              {bkg.currency}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={bkg.status}
                            onChange={(e) => updateBookingStatus(bkg.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-xs font-bold border ${
                              bkg.status === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : bkg.status === 'Pending'
                                ? 'bg-amber-950 text-amber-300 border-amber-800'
                                : 'bg-rose-950 text-rose-300 border-rose-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete reservation ${bkg.bookingRef}?`)) {
                                deleteBooking(bkg.id);
                                showToast('Reservation removed.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BLOG ARTICLES */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Travel News & Insights</h2>
                  <p className="text-xs text-slate-400">Publish or edit articles in the TRAVEX journal</p>
                </div>

                <button
                  onClick={() => {
                    setEditingBlog({
                      id: 'post-' + Date.now(),
                      title: 'Hidden Gems of the Mediterranean for 2026',
                      date: 'October 26, 2026',
                      readTime: '6 min read',
                      category: 'Expedition Guide',
                      author: 'TRAVEX Editorial',
                      image: '/src/assets/images/dest_santorini_coastal_1793005139242.jpg',
                      summary: 'Discover secluded harbors, artisan wineries, and pristine anchorages.',
                      commentsCount: 0
                    });
                    setIsNewBlog(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <img src={post.image} alt={post.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-teal-400">{post.category}</span>
                        <h4 className="text-base font-bold text-white">{post.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{post.summary}</p>
                        <div className="mt-2 text-[11px] text-slate-500">
                          By {post.author} · {post.date} · {post.readTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setEditingBlog({ ...post });
                          setIsNewBlog(false);
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(post.id, post.title)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: EDIT / CREATE TOUR */}
      {editingTour && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl relative text-xs">
            <button
              onClick={() => {
                setEditingTour(null);
                setIsNewTour(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">
              {isNewTour ? 'Add New Tour Package' : `Edit Tour: ${editingTour.title}`}
            </h3>

            <form onSubmit={handleSaveTour} className="space-y-4">
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Tour Title</label>
                <input
                  type="text"
                  required
                  value={editingTour.title}
                  onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={editingTour.country}
                    onChange={(e) => setEditingTour({ ...editingTour, country: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={editingTour.city}
                    onChange={(e) => setEditingTour({ ...editingTour, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingTour.price}
                    onChange={(e) => setEditingTour({ ...editingTour, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={editingTour.originalPrice || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={editingTour.durationDays}
                    onChange={(e) => setEditingTour({ ...editingTour, durationDays: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingTour.image}
                  onChange={(e) => setEditingTour({ ...editingTour, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingTour.description}
                  onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTour(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold uppercase tracking-wider"
                >
                  Save Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT SERVICE */}
      {editingService && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl relative text-xs">
            <button onClick={() => setEditingService(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Edit Service: {editingService.title}</h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={editingService.tagline}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">CTA Button Label</label>
                <input
                  type="text"
                  required
                  value={editingService.ctaLabel}
                  onChange={(e) => setEditingService({ ...editingService, ctaLabel: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold uppercase tracking-wider">
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT DESTINATION */}
      {editingDestination && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-xs">
            <h3 className="text-lg font-bold text-white mb-4">
              {isNewDestination ? 'Add Destination' : `Edit Destination: ${editingDestination.name}`}
            </h3>
            <form onSubmit={handleSaveDestination} className="space-y-3">
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Destination Name</label>
                <input
                  type="text"
                  required
                  value={editingDestination.name}
                  onChange={(e) => setEditingDestination({ ...editingDestination, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={editingDestination.country}
                    onChange={(e) => setEditingDestination({ ...editingDestination, country: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-400 uppercase block mb-1">Starting Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingDestination.startingPrice}
                    onChange={(e) => setEditingDestination({ ...editingDestination, startingPrice: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={editingDestination.tagline}
                  onChange={(e) => setEditingDestination({ ...editingDestination, tagline: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={editingDestination.image}
                  onChange={(e) => setEditingDestination({ ...editingDestination, image: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-[10px]"
                />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingDestination(null)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-teal-600 rounded-xl text-white font-bold uppercase">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT GUIDE */}
      {editingGuide && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-xs">
            <h3 className="text-lg font-bold text-white mb-4">
              {isNewGuide ? 'Add Tour Guide' : `Edit Guide: ${editingGuide.name}`}
            </h3>
            <form onSubmit={handleSaveGuide} className="space-y-3">
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingGuide.name}
                  onChange={(e) => setEditingGuide({ ...editingGuide, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={editingGuide.role}
                  onChange={(e) => setEditingGuide({ ...editingGuide, role: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Specialty</label>
                <input
                  type="text"
                  required
                  value={editingGuide.specialty}
                  onChange={(e) => setEditingGuide({ ...editingGuide, specialty: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingGuide(null)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-teal-600 rounded-xl text-white font-bold uppercase">Save Guide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: EDIT BLOG */}
      {editingBlog && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-xs">
            <h3 className="text-lg font-bold text-white mb-4">
              {isNewBlog ? 'New Article' : `Edit: ${editingBlog.title}`}
            </h3>
            <form onSubmit={handleSaveBlog} className="space-y-3">
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-400 uppercase block mb-1">Summary</label>
                <textarea
                  rows={3}
                  required
                  value={editingBlog.summary}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingBlog(null)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-teal-600 rounded-xl text-white font-bold uppercase">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
