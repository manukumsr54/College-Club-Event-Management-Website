import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, Users, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { CATEGORY_COLORS, DEFAULT_EVENT_IMAGE } from '../../utils/constants';

const FeaturedEvent = ({ event, onRegister }) => {
  if (!event) return null;

  const [imgSrc, setImgSrc] = useState(event.image || DEFAULT_EVENT_IMAGE);
  const categoryStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other;

  return (
    <section className="relative py-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-brand-500/30 p-6 lg:p-10 shadow-glow">
        {/* Glow ambient background elements */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Image showcase */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-2xl border border-white/10">
            <img
              src={imgSrc}
              alt={event.title}
              onError={() => setImgSrc(DEFAULT_EVENT_IMAGE)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-dark-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-dark-950" />
                Featured Event
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                {event.category}
              </span>
            </div>

            {event.registration_count !== undefined && (
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-200">
                  <Users className="w-3.5 h-3.5 text-brand-400" />
                  <span>{event.registration_count} Students Registered</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                Spotlight Event
              </div>

              <Link to={`/events/${event.id}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white hover:text-brand-300 transition-colors tracking-tight leading-tight mb-4">
                  {event.title}
                </h2>
              </Link>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-4 mb-6">
                {event.description}
              </p>

              {/* Key event stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-brand-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Date</p>
                    <p className="font-semibold text-slate-200">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Time</p>
                    <p className="font-semibold text-slate-200">{event.time}</p>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-[10px] text-slate-400 uppercase">Venue</p>
                    <p className="font-semibold text-slate-200 truncate">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onRegister(event)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Register for Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to={`/events/${event.id}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium text-sm transition-colors text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
