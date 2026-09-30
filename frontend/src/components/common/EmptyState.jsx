import React from 'react';
import { CalendarX, Search, AlertCircle } from 'lucide-react';

const EmptyState = ({
  icon: Icon = CalendarX,
  title = 'No events found',
  description = 'Try adjusting your search criteria or filter to find what you are looking for.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl glass-card border border-white/5 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4 shadow-glow">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-glow"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
