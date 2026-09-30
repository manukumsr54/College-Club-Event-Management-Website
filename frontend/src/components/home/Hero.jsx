import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Code, Users, Rocket, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Dynamic ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-brand-600/25 to-accent-cyan/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-sky/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Entrance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold mb-8 shadow-glow animate-fade-in">
          <Terminal className="w-4 h-4 text-brand-400" />
          <span>CodeChef Student Chapter</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Where <span className="text-gradient-brand">Coders</span> Meet, Build &{' '}
          <span className="relative">
            Compete.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-brand-500/60 -z-10"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M0 10 Q 50 0, 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Short Club Description */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          A student-driven technical community focused on competitive programming, problem solving, coding competitions, hands-on workshops, and peer collaboration. Fostering a passionate culture of daily coding and algorithmic thinking.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link
            to="/events"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-base border border-white/15 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-brand-400" />
            <span>Join the Community</span>
          </Link>
        </div>

        {/* Live Metrics preview bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">500+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Active Coders</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent-cyan">30+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Contests & Sprints</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-400">100%</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Student Driven</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent-emerald">Free</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Open to All Years</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
