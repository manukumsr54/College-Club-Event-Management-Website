import React from 'react';
import { Edit2, Trash2, Users, Sparkles, Calendar, MapPin, Tag } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { CATEGORY_COLORS, DEFAULT_EVENT_IMAGE } from '../../utils/constants';

const EventTable = ({ events, onEdit, onDelete, onViewRegistrations }) => {
  if (!events || events.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center border border-white/5">
        <p className="text-slate-400 text-sm">No events found in the database.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl glass-panel border border-white/10">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase font-bold text-slate-400 border-b border-white/10 tracking-wider">
            <tr>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Venue</th>
              <th className="px-6 py-4 text-center">Featured</th>
              <th className="px-6 py-4 text-center">Registrations</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {events.map((event) => {
              const catStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other;
              return (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Event Name & Thumbnail */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
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
                      <div className="min-w-0 max-w-xs">
                        <p className="text-white font-bold truncate leading-snug">{event.title}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{event.description}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                      {event.category}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-white font-medium">{formatDate(event.date)}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{event.time}</p>
                  </td>

                  {/* Venue */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="truncate text-slate-300">{event.venue}</p>
                  </td>

                  {/* Featured */}
                  <td className="px-6 py-4 text-center">
                    {event.featured ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">No</span>
                    )}
                  </td>

                  {/* Registrations count badge */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onViewRegistrations(event.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-brand-300 transition-colors border border-white/5"
                    >
                      <Users className="w-3 h-3 text-brand-400" />
                      <span>{event.registration_count || 0} students</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(event)}
                        title="Edit Event"
                        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(event)}
                        title="Delete Event"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {events.map((event) => {
          const catStyle = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.Other;
          return (
            <div key={event.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark-800 shrink-0 border border-white/10">
                  <img
                    src={event.image || DEFAULT_EVENT_IMAGE}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_EVENT_IMAGE;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                    >
                      {event.category}
                    </span>
                    {event.featured && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-dark-950">
                        Featured
                      </span>
                    )}
                  </div>
                  <h4 className="text-white font-bold text-sm truncate">{event.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-brand-400" />
                    <span>{formatDate(event.date)}</span>
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300 pt-2 border-t border-white/5 space-y-1">
                <p className="truncate flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3 h-3 text-brand-400 shrink-0" />
                  <span>{event.venue}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  onClick={() => onViewRegistrations(event.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-brand-300 font-semibold px-2.5 py-1.5 rounded-lg bg-white/5"
                >
                  <Users className="w-3.5 h-3.5 text-brand-400" />
                  <span>{event.registration_count || 0} Registered</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(event)}
                    className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(event)}
                    className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventTable;
