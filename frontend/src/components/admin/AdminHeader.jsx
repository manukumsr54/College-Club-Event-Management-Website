import React from 'react';
import { Menu, Bell, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = ({ title, subtitle, onToggleMobileSidebar }) => {
  const { admin } = useAuth();

  return (
    <header className="glass-panel border-b border-white/10 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu hamburger toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white glass-card border border-white/10"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Session</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
