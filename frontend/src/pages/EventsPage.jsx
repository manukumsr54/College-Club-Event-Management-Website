import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Filter, Sparkles, RefreshCw } from 'lucide-react';
import SearchBar from '../components/events/SearchBar';
import CategoryFilter from '../components/events/CategoryFilter';
import EventGrid from '../components/events/EventGrid';
import RegistrationModal from '../components/events/RegistrationModal';
import { getEvents } from '../services/eventService';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);

  // Sync category state with query parameters
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const fetchFilteredEvents = async () => {
    setIsLoading(true);
    try {
      const res = await getEvents({
        category: selectedCategory,
        search: searchQuery,
      });
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredEvents();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  const handleRegister = (event) => {
    setSelectedEventForReg(event);
  };

  const handleRegistrationSuccess = () => {
    fetchFilteredEvents();
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-brand-400" />
            <span>Discover & Learn</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Explore All Club Events
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Find and register for upcoming competitions, technical bootcamps, workshops, and student networking opportunities.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search events by name, keywords, or topics..."
              />
            </div>

            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl glass-card border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-white/5">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <p>
            Showing <span className="font-bold text-white">{events.length}</span> event{events.length === 1 ? '' : 's'}
            {selectedCategory !== 'All' && (
              <span> in <span className="text-brand-300 font-semibold">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching "<span className="text-white font-medium">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Event Cards Grid */}
        <EventGrid
          events={events}
          isLoading={isLoading}
          onRegister={handleRegister}
          onResetFilter={handleResetFilters}
        />
      </div>

      {/* Registration Modal */}
      {selectedEventForReg && (
        <RegistrationModal
          isOpen={!!selectedEventForReg}
          onClose={() => setSelectedEventForReg(null)}
          event={selectedEventForReg}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default EventsPage;
