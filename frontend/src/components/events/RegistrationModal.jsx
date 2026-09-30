import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  AlertCircle,
  User,
  Mail,
  School,
  GraduationCap,
  Phone,
  Ticket,
  Check
} from 'lucide-react';
import Modal from '../common/Modal';
import { COLLEGE_YEARS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { registerForEvent } from '../../services/registrationService';
import { useToast } from '../../contexts/ToastContext';

const RegistrationModal = ({ isOpen, onClose, event, onRegistrationSuccess }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '1st Year',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        college: '',
        year: '1st Year',
        phone: '',
      });
      setErrors({});
      setSuccessData(null);
    }
  }, [isOpen, event]);

  if (!event) return null;

  // Frontend validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College or University name is required';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your academic year';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (min 7 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        event_id: event.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        college: formData.college.trim(),
        year: formData.year,
        phone: formData.phone.trim(),
      };

      const res = await registerForEvent(payload);

      if (res.success) {
        setSuccessData(res.data);
        toast.success(res.message || "Registration successful! You're all set for the event.");
        if (onRegistrationSuccess) {
          onRegistrationSuccess(res.data);
        }
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please check your details.');
      if (err.errors) {
        const backendErrors = {};
        err.errors.forEach((e) => {
          backendErrors[e.path] = e.msg;
        });
        setErrors(backendErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={successData ? 'Registration Confirmed' : `Register for ${event.title}`}
      maxWidth="max-w-xl"
    >
      {successData ? (
        /* Success Confirmation View */
        <div className="py-2 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/40">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-white">Registration Successful!</h4>
            <p className="text-slate-300 text-sm">
              You're all set for <span className="text-brand-300 font-semibold">{event.title}</span>.
            </p>
          </div>

          {/* Digital Pass / Ticket Card */}
          <div className="glass-panel p-5 rounded-2xl border border-brand-500/30 text-left relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Ticket className="w-24 h-24 text-white" />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Attendee</span>
                <p className="text-base font-bold text-white">{successData.name}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pass ID</span>
                <p className="text-xs font-mono font-bold text-brand-400">REG-{successData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Email</span>
                <span className="truncate block font-medium">{successData.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">College</span>
                <span className="truncate block font-medium">{successData.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Event Date</span>
                <span className="font-medium text-slate-200">{formatDate(event.date)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Venue</span>
                <span className="truncate block font-medium">{event.venue}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            A confirmation receipt has been saved in the database. Please arrive 15 minutes before scheduled start time.
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition-all"
          >
            Done
          </button>
        </div>
      ) : (
        /* Registration Form View */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Quick Info Banner */}
          <div className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center gap-3 text-xs text-slate-300">
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-dark-800">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{event.title}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-400" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-brand-400" />
                  {event.time}
                </span>
              </div>
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-400" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maya Chen"
              className={`w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-rose-500/80 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-brand-500 focus:ring-brand-500/20'
              }`}
            />
            {errors.name && (
              <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. student@college.edu"
              className={`w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-500/80 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-brand-500 focus:ring-brand-500/20'
              }`}
            />
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* College / Institution */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-brand-400" />
              <span>College / University / Institution *</span>
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="e.g. State Institute of Technology"
              className={`w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border focus:outline-none focus:ring-2 transition-all ${
                errors.college
                  ? 'border-rose-500/80 focus:ring-rose-500/20'
                  : 'border-white/10 focus:border-brand-500 focus:ring-brand-500/20'
              }`}
            />
            {errors.college && (
              <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.college}
              </p>
            )}
          </div>

          {/* Year & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brand-400" />
                <span>Academic Year *</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white bg-dark-900 border border-white/10 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              >
                {COLLEGE_YEARS.map((y) => (
                  <option key={y} value={y} className="bg-dark-900 text-white">
                    {y}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.year}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className={`w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-rose-500/80 focus:ring-rose-500/20'
                    : 'border-white/10 focus:border-brand-500 focus:ring-brand-500/20'
                }`}
              />
              {errors.phone && (
                <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md hover:shadow-glow transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Registration</span>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RegistrationModal;
