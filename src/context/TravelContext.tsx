import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TOUR_PACKAGES,
  DESTINATIONS,
  GUIDES,
  BLOG_POSTS,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  TourPackage,
  Destination,
  Guide,
  BlogPost,
  TravelService,
  BookingRecord
} from '../data/travelData';

interface TravelContextType {
  tours: TourPackage[];
  addTour: (tour: TourPackage) => void;
  updateTour: (tour: TourPackage) => void;
  deleteTour: (id: string) => void;

  services: TravelService[];
  updateService: (service: TravelService) => void;

  destinations: Destination[];
  addDestination: (dest: Destination) => void;
  updateDestination: (dest: Destination) => void;
  deleteDestination: (id: string) => void;

  guides: Guide[];
  addGuide: (guide: Guide) => void;
  updateGuide: (guide: Guide) => void;
  deleteGuide: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  bookings: BookingRecord[];
  addBooking: (bkg: Omit<BookingRecord, 'id' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: BookingRecord['status']) => void;
  deleteBooking: (id: string) => void;

  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  resetToDefaults: () => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TOURS: 'travex_tours_data',
  SERVICES: 'travex_services_data',
  DESTINATIONS: 'travex_destinations_data',
  GUIDES: 'travex_guides_data',
  BLOG: 'travex_blog_data',
  BOOKINGS: 'travex_bookings_data',
  ADMIN_AUTH: 'travex_admin_auth'
};

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Tours
  const [tours, setTours] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOURS);
      return saved ? JSON.parse(saved) : TOUR_PACKAGES;
    } catch {
      return TOUR_PACKAGES;
    }
  });

  // 2. Services
  const [services, setServices] = useState<TravelService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // 3. Destinations
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
      return saved ? JSON.parse(saved) : DESTINATIONS;
    } catch {
      return DESTINATIONS;
    }
  });

  // 4. Guides
  const [guides, setGuides] = useState<Guide[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GUIDES);
      return saved ? JSON.parse(saved) : GUIDES;
    } catch {
      return GUIDES;
    }
  });

  // 5. Blog Posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
      return saved ? JSON.parse(saved) : BLOG_POSTS;
    } catch {
      return BLOG_POSTS;
    }
  });

  // 6. Bookings
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // 7. Admin Session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours));
    } catch (e) {
      console.error(e);
    }
  }, [tours]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
    } catch (e) {
      console.error(e);
    }
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
    } catch (e) {
      console.error(e);
    }
  }, [guides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
    } catch (e) {
      console.error(e);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Tours CRUD
  const addTour = (newTour: TourPackage) => {
    setTours((prev) => [newTour, ...prev]);
  };

  const updateTour = (updatedTour: TourPackage) => {
    setTours((prev) => prev.map((t) => (t.id === updatedTour.id ? updatedTour : t)));
  };

  const deleteTour = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  // Services Update
  const updateService = (updatedService: TravelService) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
  };

  // Destinations CRUD
  const addDestination = (newDest: Destination) => {
    setDestinations((prev) => [newDest, ...prev]);
  };

  const updateDestination = (updatedDest: Destination) => {
    setDestinations((prev) => prev.map((d) => (d.id === updatedDest.id ? updatedDest : d)));
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  // Guides CRUD
  const addGuide = (newGuide: Guide) => {
    setGuides((prev) => [newGuide, ...prev]);
  };

  const updateGuide = (updatedGuide: Guide) => {
    setGuides((prev) => prev.map((g) => (g.id === updatedGuide.id ? updatedGuide : g)));
  };

  const deleteGuide = (id: string) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
  };

  // Blog CRUD
  const addBlogPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Bookings CRUD
  const addBooking = (bkgData: Omit<BookingRecord, 'id' | 'createdAt'>): string => {
    const id = 'bkg-' + Date.now();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newRecord: BookingRecord = {
      ...bkgData,
      id,
      createdAt: now
    };
    setBookings((prev) => [newRecord, ...prev]);
    return id;
  };

  const updateBookingStatus = (id: string, status: BookingRecord['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Admin Auth (Required password: Rich234)
  const adminLogin = (password: string): boolean => {
    if (password === 'Rich234') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
  };

  const resetToDefaults = () => {
    setTours(TOUR_PACKAGES);
    setServices(INITIAL_SERVICES);
    setDestinations(DESTINATIONS);
    setGuides(GUIDES);
    setBlogPosts(BLOG_POSTS);
    setBookings(INITIAL_BOOKINGS);
    localStorage.clear();
  };

  return (
    <TravelContext.Provider
      value={{
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
        addBooking,
        updateBookingStatus,
        deleteBooking,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetToDefaults
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
