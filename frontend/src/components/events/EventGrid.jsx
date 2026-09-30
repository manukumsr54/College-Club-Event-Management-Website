import React from 'react';
import EventCard from './EventCard';
import EmptyState from '../common/EmptyState';

const EventGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl glass-card border border-white/5 overflow-hidden animate-pulse flex flex-col h-[400px]"
        >
          <div className="aspect-[16/9] w-full bg-slate-800/60" />
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-5 bg-slate-800/80 rounded w-3/4" />
              <div className="h-3.5 bg-slate-800/50 rounded w-full" />
              <div className="h-3.5 bg-slate-800/50 rounded w-5/6" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-800/40 rounded w-1/2" />
              <div className="h-3 bg-slate-800/40 rounded w-2/3" />
            </div>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <div className="h-9 bg-slate-800/60 rounded-xl flex-1" />
              <div className="h-9 bg-slate-800/60 rounded-xl flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EventGrid = ({ events, isLoading, onRegister, onResetFilter }) => {
  if (isLoading) {
    return <EventGridSkeleton count={6} />;
  }

  if (!events || events.length === 0) {
    return (
      <EmptyState
        title="No matching events found"
        description="We couldn't find any events matching your selected category and search keywords."
        actionText={onResetFilter ? "Reset All Filters" : undefined}
        onAction={onResetFilter}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onRegister={onRegister} />
      ))}
    </div>
  );
};

export default EventGrid;
