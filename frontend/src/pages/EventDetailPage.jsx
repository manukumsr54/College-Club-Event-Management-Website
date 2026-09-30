import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowLeft,
  Share2,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { getEventById } from '../services/eventService';
import { formatDate } from '../utils/formatters';
import { CATEGORY_COLORS, DEFAULT_EVENT_IMAGE } from '../utils/constants';
import RegistrationModal from '../components/events/RegistrationModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useToast } from '../contexts/ToastContext';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(DEFAULT_EVENT_IMAGE);

  const fetchEvent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getEventById(id);
      if (res.success && res.data) {
        setEvent(res.data);
        setImgSrc(res.data.image || DEFAULT_EVENT_IMAGE);
      }
    } catch (err) {
      setError(err.message || 'Event not found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <LoadingSpinner message="Loading event details..." fullScreen />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Event Not Found</h2>
          <p className="text-slate-400 text-sm">
            The event you are looking for might have concluded or been removed by the club administrators.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Content: Large Image & Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Image Container */}
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[16/9] shadow-2xl bg-dark-800">
              <img
                src={imgSrc}
                alt={event.title}
                onError={() => setImgSrc(DEFAULT_EVENT_IMAGE)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                >
                  <span className={`w-2 h-2 rounded-full ${categoryStyle.dot}`} />
                  {event.category}
                </span>

                {event.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-dark-950 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-dark-950" />
                    Featured
                  </span>
                )}
              </div>

              {event.registration_count !== undefined && (
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md text-xs font-semibold text-white">
                    <Users className="w-4 h-4 text-brand-400" />
                    <span>{event.registration_count} Students Registered</span>
                  </div>
                </div>
              )}
            </div>

            {/* Event Title & Metadata Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-b border-white/10 pb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span className="font-semibold text-white">{formatDate(event.date)}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>{event.time}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Full Event Description Section */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-400" />
                <span>About this Event</span>
              </h2>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </div>

              {/* What to bring / expectations */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Important Attendee Guidelines
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bring your active Student ID card for on-venue entry check-in.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Laptops and charging gear recommended for coding/workshop sessions.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Registration is complimentary and open to all departments and colleges.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Sticky Registration Action Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-brand-500/30 shadow-glow space-y-6">
              <div>
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest block mb-1">
                  Registration Open
                </span>
                <p className="text-2xl font-extrabold text-white">Free Student Admission</p>
                <p className="text-xs text-slate-400 mt-1">
                  Limited seats available. Please register to reserve your workshop seat and materials.
                </p>
              </div>

              {/* Quick details summary */}
              <div className="space-y-3 text-xs text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="font-bold text-white">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time</span>
                  <span className="font-bold text-white">{event.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Venue</span>
                  <span className="font-bold text-white truncate max-w-[150px]">{event.venue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Category</span>
                  <span className="font-bold text-brand-300">{event.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-glow transition-all duration-300 hover:scale-[1.02] text-center"
                >
                  Register Now
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-3 px-4 rounded-2xl glass-card hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Share Event Link</span>
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-slate-400">
                  Organized with pride by <span className="text-brand-300 font-semibold">CodeChef Student Chapter</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        event={event}
        onRegistrationSuccess={fetchEvent}
      />
    </div>
  );
};

export default EventDetailPage;
