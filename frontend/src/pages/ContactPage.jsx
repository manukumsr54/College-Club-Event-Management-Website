import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const ContactPage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate inquiry dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success('Your message has been received! Our committee will reply shortly.');
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-brand-400" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact CodeChef Student Chapter
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about upcoming coding contests, DSA bootcamps, or joining the student chapter? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Campus Headquarters</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Drop by our coding lab workspace during open hours or reach out through our digital communication channels.
              </p>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl glass-card border border-white/5">
                  <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Computer Lab 3 & Coding Hub</p>
                    <p className="text-xs text-slate-400 mt-0.5">Tech Building, Main Campus</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl glass-card border border-white/5">
                  <Mail className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Email Inquiries</p>
                    <p className="text-xs text-slate-400 mt-0.5">codechef.chapter@college.edu</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl glass-card border border-white/5">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Club Helpdesk</p>
                    <p className="text-xs text-slate-400 mt-0.5">+1 (555) 019-2834 (Mon-Fri, 10 AM - 5 PM)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-brand-300 block mb-1">Weekly Office Hours</span>
                Core Committee members are available every Wednesday & Friday from 4:00 PM to 6:00 PM for project guidance and club queries.
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill in your details and we will get back to you within 24–48 hours.
                </p>
              </div>

              {isSent ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. We have received your inquiry and our event coordination team will be in touch.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Question about HackNova 2026 eligibility"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your question or message here..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
