import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Users,
  Trophy,
  Terminal,
  Compass,
  ArrowRight,
  Binary,
  Cpu,
  HelpCircle,
  Flame,
  BookOpen
} from 'lucide-react';

const AboutPage = () => {
  const teamLeads = [
    {
      name: 'Aditya Narayan',
      role: 'Chapter President / Lead Organizer',
      department: 'Computer Science, 4th Year',
      bio: 'Competitive programming enthusiast dedicated to cultivating strong algorithmic problem solving across campus.',
    },
    {
      name: 'Sneha Kulkarni',
      role: 'CP & Contest Operations Lead',
      department: 'Information Technology, 3rd Year',
      bio: 'Curating contest problem sets, organizing sprint challenges, and coordinating editorial review sessions.',
    },
    {
      name: 'Rohan Deshmukh',
      role: 'DSA & Technical Workshop Lead',
      department: 'Computer Science, 3rd Year',
      bio: 'Leading deep-dives into core data structures, graph theory, dynamic programming, and algorithm complexities.',
    },
    {
      name: 'Tanvi Agarwal',
      role: 'Community Outreach & Events Lead',
      department: 'Electronics & Comm, 2nd Year',
      bio: 'Facilitating student registrations, newcomer onboarding, and collaborative cross-department study circles.',
    },
  ];

  const faqs = [
    {
      q: 'Who can join the CodeChef Student Chapter?',
      a: 'Any enrolled student from any department, major, or academic year is warmly welcome to join and participate in all our coding contests and workshops.',
    },
    {
      q: 'Do I need prior competitive programming experience?',
      a: 'Not at all. We organize specialized beginner-friendly tracks and onboarding sessions alongside advanced contest preparation for experienced programmers.',
    },
    {
      q: 'Are chapter events and contests free?',
      a: 'Yes! All contests, workshops, algorithm bootcamps, and tech talks organized by the Chapter are 100% free of charge for students.',
    },
    {
      q: 'How do registrations work?',
      a: 'You can explore any contest or workshop on our events portal and submit your details. Your registration is saved in our database and a digital admission pass is generated.',
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-brand-400" />
            <span>Our Mission & Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Empowering Campus Programmers & Problem Solvers
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            The CodeChef Student Chapter is dedicated to cultivating a thriving competitive programming culture, algorithmic problem solving, and technical collaboration across campus.
          </p>
        </div>

        {/* Story & Philosophy */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Why We Exist</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We bridge academic classroom foundations with practical, contest-level problem solving. Real algorithmic fluency comes from hands-on practice, tackling diverse problem types, and understanding edge cases.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Through peer discussions, post-contest solution walkthroughs, and structured weekly practice, the Chapter empowers every coder to build consistency, improve time complexity awareness, and excel in competitive programming.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <Binary className="w-8 h-8 text-brand-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">Problem Solving</p>
              <p className="text-xs text-slate-400">DSA mastery and algorithmic thinking</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <Users className="w-8 h-8 text-accent-cyan mx-auto mb-2" />
              <p className="text-xl font-bold text-white">Peer Learning</p>
              <p className="text-xs text-slate-400">Collaborative study rooms and review</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">Contests</p>
              <p className="text-xs text-slate-400">Regular challenges and timed sprints</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 text-center">
              <Flame className="w-8 h-8 text-rose-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">Consistency</p>
              <p className="text-xs text-slate-400">Building lasting daily coding habits</p>
            </div>
          </div>
        </div>

        {/* Student Committee / Leads Showcase */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Student Chapter Committee</h2>
            <p className="text-slate-400 text-sm mt-1">
              Meet the student organizers leading contest operations, DSA workshops, and chapter logistics this academic year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamLeads.map((member, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-300 flex items-center justify-center font-extrabold text-lg mb-4">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-brand-400 mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{member.department}</p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand-400" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                <p className="text-sm font-bold text-white">{faq.q}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 text-center space-y-6 shadow-glow">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to solve problems and compete?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Explore our schedule of upcoming competitive programming contests, workshops, and algorithmic bootcamps.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Explore Events & Contests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
