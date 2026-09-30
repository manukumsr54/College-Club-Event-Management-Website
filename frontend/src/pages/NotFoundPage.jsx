import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center max-w-lg mx-auto space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 mx-auto flex items-center justify-center shadow-glow">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-gradient-brand">404</span>
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you are looking for doesn't exist or may have been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/events"
            className="w-full sm:w-auto px-6 py-3 rounded-xl glass-card hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
