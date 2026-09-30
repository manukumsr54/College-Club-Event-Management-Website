import React from 'react';
import {
  Code2,
  Terminal,
  Trophy,
  Users2,
  HeartHandshake,
  Lightbulb,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';

const ClubIntro = () => {
  const pillars = [
    {
      icon: Binary,
      title: 'Competitive Programming',
      description:
        'Cultivating algorithmic intuition through regular contest preparation, problem solving on arrays, graphs, recursion, and dynamic programming.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      icon: Trophy,
      title: 'Contests & Challenges',
      description:
        'Organizing campus-wide coding rounds, rapid debugging contests, and algorithmic challenges that build speed, accuracy, and confidence under pressure.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: Terminal,
      title: 'DSA & Tech Workshops',
      description:
        'Hands-on bootcamps exploring data structures, algorithm complexities, modern web tech, and practical development workflows from scratch.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      icon: HeartHandshake,
      title: 'Peer Learning & Consistency',
      description:
        'An inclusive environment where experienced student programmers mentor newcomers, share contest strategies, and encourage daily coding consistency.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5 text-brand-400" />
            <span>CodeChef Community Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Fostering a Culture of Competitive Programming & Problem Solving
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            The CodeChef Student Chapter is a student-led technical society dedicated to helping programmers excel. Through peer collaboration, coding contests, and structured workshops, we make algorithmic problem solving accessible and rewarding for all students.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${pillar.bg} ${pillar.border} border flex items-center justify-center ${pillar.color} mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How Student Participation Works */}
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                Student Participation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                How you can get involved in Chapter activities
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are writing your first lines of code or preparing for competitive coding contests, the Chapter provides resources, collaborative practice rooms, and structured learning paths open to all students.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span>Free registration for all campus coding contests and workshops</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span>Post-contest editorial walkthroughs and approach breakdown discussions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span>Peer guidance and practice recommendations from senior student competitors</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="glass-card p-5 rounded-2xl border border-white/10 bg-brand-900/20">
                <p className="text-xs text-brand-300 font-semibold uppercase tracking-wider mb-1">
                  Weekly Practice & Doubt Sessions
                </p>
                <p className="text-white font-bold text-sm">Every Wednesday at 5:00 PM</p>
                <p className="text-xs text-slate-400 mt-1">Computer Lab 3, Tech Building</p>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-white/10 bg-accent-cyan/10">
                <p className="text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-1">
                  Monthly Chapter Contests
                </p>
                <p className="text-white font-bold text-sm">Online & Lab-Based Rounds</p>
                <p className="text-xs text-slate-400 mt-1">Curated problem sets spanning beginner to advanced levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubIntro;
