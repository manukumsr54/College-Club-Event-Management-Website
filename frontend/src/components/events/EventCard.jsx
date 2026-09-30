import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { formatDate, truncateText } from '../../utils/formatters';
import { CATEGORY_COLORS, DEFAULT_EVENT_IMAGE } from '../../utils/constants';

const EventCard = ({ event, onRegister }) => {
  const [imgSrc, setImgSrc] = useState(event.image || DEFAULT_EVENT_IMAGE);
  const [hasError, setHasError] = useState(false);

  const categoryStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other;

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(DEFAULT_EVENT_IMAGE);
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full border border-white/10 hover:border-brand-500/40 transition-all duration-300">
      {/* Event Image & Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-800">
        <img
          src={imgSrc}
          alt={event.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
            {event.category}
          </span>
        </div>

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-slate-950 backdrop-blur-md shadow-md">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Featured
            </span>
          </div>
        )}

        {/* Registration Counter */}
        {event.registration_count !== undefined && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-dark-950/80 text-slate-300 backdrop-blur-md border border-white/10">
              <Users className="w-3 h-3 text-brand-400" />
              <span>{event.registration_count} registered</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link to={`/events/${event.id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1 mb-2">
              {event.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Metadata: Date, Time, Venue */}
          <div className="space-y-1.5 text-xs text-slate-300 mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center gap-2.5">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 py-2 px-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-medium text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => onRegister(event)}
            className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md hover:shadow-glow transition-all duration-200 text-center"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
