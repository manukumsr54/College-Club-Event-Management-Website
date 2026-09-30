import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Image as ImageIcon, Tag, FileText, Type } from 'lucide-react';
import Modal from '../common/Modal';
import { EVENT_CATEGORIES, DEFAULT_EVENT_IMAGE } from '../../utils/constants';

const EventFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isSubmitting = false }) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    time: '',
    venue: '',
    image: '',
    featured: false,
  });

  const [errors, setErrors] = useState({});
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Format date to YYYY-MM-DD
      let formattedDate = initialData.date || '';
      if (formattedDate.includes('T')) {
        formattedDate = formattedDate.split('T')[0];
      }

      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Technical',
        date: formattedDate,
        time: initialData.time || '',
        venue: initialData.venue || '',
        image: initialData.image || '',
        featured: Boolean(initialData.featured),
      });
      setImagePreviewError(false);
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Technical',
        date: '',
        time: '',
        venue: '',
        image: '',
        featured: false,
      });
      setImagePreviewError(false);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';

    if (formData.image && formData.image.trim() !== '') {
      try {
        new URL(formData.image.trim());
      } catch {
        newErrors.image = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'image') setImagePreviewError(false);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      image: formData.image.trim() || DEFAULT_EVENT_IMAGE,
    });
  };

  // Filter out 'All' for category selection
  const categoriesList = EVENT_CATEGORIES.filter((c) => c !== 'All');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Event' : 'Create New Event'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-brand-400" />
            <span>Event Title *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. AI Agents & LLM Hackathon 2026"
            className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-400" />
            <span>Full Description *</span>
          </label>
          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn, tracks, eligibility, rules, and schedule..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-y"
          />
          {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-400" />
              <span>Category *</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white bg-dark-900 border border-white/10 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat} className="bg-dark-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-rose-400 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              <span>Event Date *</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white bg-dark-900 border border-white/10 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {errors.date && <p className="text-rose-400 text-xs mt-1">{errors.date}</p>}
          </div>
        </div>

        {/* Time & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>Time / Schedule *</span>
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM - 04:00 PM"
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {errors.time && <p className="text-rose-400 text-xs mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Venue / Location *</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Main Auditorium & Innovation Lab"
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {errors.venue && <p className="text-rose-400 text-xs mt-1">{errors.venue}</p>}
          </div>
        </div>

        {/* Image URL & Live Preview */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-brand-400" />
            <span>Event Image URL (Unsplash or direct image URL)</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-slate-500 text-sm border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          {errors.image && <p className="text-rose-400 text-xs mt-1">{errors.image}</p>}

          {/* Live Preview */}
          <div className="mt-2.5 flex items-center gap-3 p-2.5 rounded-xl glass-panel border border-white/5">
            <div className="w-16 h-12 rounded-lg overflow-hidden bg-dark-800 shrink-0 border border-white/10">
              <img
                src={imagePreviewError || !formData.image ? DEFAULT_EVENT_IMAGE : formData.image}
                alt="Preview"
                onError={() => setImagePreviewError(true)}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-slate-400 leading-snug">
              {formData.image
                ? imagePreviewError
                  ? 'Image URL failed to load. Will fallback gracefully.'
                  : 'Live image preview loaded.'
                : 'Using default event backdrop image.'}
            </span>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="pt-2">
          <label className="relative flex items-center gap-3 cursor-pointer p-3 rounded-xl glass-panel border border-white/5 hover:border-brand-500/30 transition-colors">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded text-brand-600 bg-dark-900 border-white/20 focus:ring-brand-500"
            />
            <div className="flex-1">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Mark as Featured Event</span>
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Promotes this event to the prominent homepage hero showcase banner.
              </span>
            </div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
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
                <span>Saving to Database...</span>
              </>
            ) : (
              <span>{isEditing ? 'Save Changes' : 'Create Event'}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventFormModal;
