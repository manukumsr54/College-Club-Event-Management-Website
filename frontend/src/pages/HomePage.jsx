import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import Hero from '../components/home/Hero';
import ClubIntro from '../components/home/ClubIntro';
import FeaturedEvent from '../components/events/FeaturedEvent';
import EventCard from '../components/events/EventCard';
import RegistrationModal from '../components/events/RegistrationModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getFeaturedEvent, getEvents } from '../services/eventService';

const HomePage = () => {
  const [featured, setFeatured] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);

  const fetchHomeData = async () => {
    setIsLoading(true);
    try {
      const [featRes, eventsRes] = await Promise.all([
        getFeaturedEvent().catch(() => ({ data: null })),
        getEvents({ limit: 6, upcoming: true }).catch(() => ({ data: [] })),
      ]);

      if (featRes && featRes.data) {
        setFeatured(featRes.data);
      }
      if (eventsRes && eventsRes.data) {
        setUpcomingEvents(eventsRes.data);
      }
    } catch (err) {
      console.error('Error fetching home page data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleRegister = (event) => {
    setSelectedEventForReg(event);
  };

  const handleRegistrationSuccess = () => {
    fetchHomeData();
  };

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Club Introduction */}
      <ClubIntro />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
        {/* 3. Featured Event Section */}
        {featured && (
          <div>
            <FeaturedEvent event={featured} onRegister={handleRegister} />
          </div>
        )}

        {/* 4. Upcoming Events Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>Upcoming Schedule</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Featured & Upcoming Events
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Explore our upcoming technical sprints, hackathons, and community gatherings.
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300 transition-colors group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner message="Loading upcoming events from server..." />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl text-center border border-white/5">
              <p className="text-slate-400 text-sm">No upcoming events scheduled right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onRegister={handleRegister} />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all hover:border-brand-500/30"
            >
              <span>Browse Complete Event Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
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

export default HomePage;
