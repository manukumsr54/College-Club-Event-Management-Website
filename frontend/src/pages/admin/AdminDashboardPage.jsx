import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  CalendarCheck,
  Users,
  Sparkles,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Layers
} from 'lucide-react';
import DashboardCard from '../../components/admin/DashboardCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getDashboardStats } from '../../services/authService';
import { formatDate } from '../../utils/formatters';
import { DEFAULT_EVENT_IMAGE } from '../../utils/constants';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await getDashboardStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Calculating dashboard metrics..." fullScreen />;
  }

  const {
    totalEvents = 0,
    upcomingEvents = 0,
    totalRegistrations = 0,
    featuredEvent = null,
    recentEvents = [],
    categoryStats = [],
  } = stats || {};

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quick Action Topbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Ecosystem Overview</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time statistics connected directly to PostgreSQL.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/events"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md hover:shadow-glow transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Events</span>
          </Link>

          <Link
            to="/admin/registrations"
            className="px-4 py-2.5 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-brand-400" />
            <span>View Registrations</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Total Events"
          value={totalEvents}
          subtitle="All-time created events in system"
          icon={CalendarDays}
          colorScheme="indigo"
          onClick={() => navigate('/admin/events')}
        />

        <DashboardCard
          title="Upcoming Events"
          value={upcomingEvents}
          subtitle="Scheduled for future dates"
          icon={CalendarCheck}
          colorScheme="cyan"
          onClick={() => navigate('/admin/events')}
        />

        <DashboardCard
          title="Total Registrations"
          value={totalRegistrations}
          subtitle="Students enrolled across all events"
          icon={Users}
          colorScheme="emerald"
          onClick={() => navigate('/admin/registrations')}
        />

        <DashboardCard
          title="Featured Event"
          value={featuredEvent ? 'Active' : 'None'}
          subtitle={featuredEvent ? featuredEvent.title : 'No event marked featured'}
          icon={Sparkles}
          colorScheme="amber"
          onClick={() => navigate('/admin/events')}
        />
      </div>

      {/* Two Columns: Recent Events & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent / Upcoming Events */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Recent & Upcoming Events</h3>
              <p className="text-xs text-slate-400 mt-0.5">Quick access to current events on the schedule</p>
            </div>
            <Link
              to="/admin/events"
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <p className="text-slate-400 text-xs py-4 text-center">No events available.</p>
            ) : (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-dark-800 shrink-0 border border-white/10">
                      <img
                        src={event.image || DEFAULT_EVENT_IMAGE}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_EVENT_IMAGE;
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{event.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span>{formatDate(event.date)}</span>
                        <span>•</span>
                        <span className="text-brand-300">{event.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-400" />
                      <span>{event.registration_count || 0} students</span>
                    </span>

                    <Link
                      to={`/admin/registrations?eventId=${event.id}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="View Registrations"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Category Distribution & Featured Banner */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Spotlight Card */}
          {featuredEvent && (
            <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                <span>Active Hero Spotlight</span>
              </div>
              <h4 className="text-white font-bold text-sm leading-snug">{featuredEvent.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{featuredEvent.description}</p>
              <div className="text-xs text-slate-300 flex items-center justify-between pt-2 border-t border-white/10">
                <span>{formatDate(featuredEvent.date)}</span>
                <span className="font-semibold text-amber-300">{featuredEvent.registration_count} registered</span>
              </div>
            </div>
          )}

          {/* Event Categories Breakdown */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Layers className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Categories Breakdown</h3>
            </div>

            <div className="space-y-2.5">
              {categoryStats.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
