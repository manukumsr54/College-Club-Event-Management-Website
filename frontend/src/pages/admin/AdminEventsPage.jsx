import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Filter, RefreshCw, CalendarDays } from 'lucide-react';
import EventTable from '../../components/admin/EventTable';
import EventFormModal from '../../components/admin/EventFormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/eventService';
import { useToast } from '../../contexts/ToastContext';
import { EVENT_CATEGORIES } from '../../utils/constants';

const AdminEventsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation state
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    try {
      const res = await getEvents({
        search: searchQuery,
        category: selectedCategory,
      });
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllEvents();
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingEvent) {
        // Update existing event
        const res = await updateEvent(editingEvent.id, formData);
        if (res.success) {
          toast.success(`Event "${res.data.title}" updated successfully!`);
          setIsFormOpen(false);
          setEditingEvent(null);
          fetchAllEvents();
        }
      } else {
        // Create new event
        const res = await createEvent(formData);
        if (res.success) {
          toast.success(`Event "${res.data.title}" created successfully!`);
          setIsFormOpen(false);
          fetchAllEvents();
        }
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save event to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePrompt = (event) => {
    setEventToDelete(event);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteEvent(eventToDelete.id);
      if (res.success) {
        toast.success(res.message || 'Event deleted successfully.');
        setEventToDelete(null);
        fetchAllEvents();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete event.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewRegistrations = (eventId) => {
    navigate(`/admin/registrations?eventId=${eventId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Add Event Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Event Catalog Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add new club events, update information, and manage registrations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title or venue..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card text-white text-xs border border-white/5 focus:outline-none focus:border-brand-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl glass-card text-white bg-dark-900 border border-white/10 text-xs focus:outline-none focus:border-brand-500"
          >
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-dark-900 text-white">
                Category: {cat}
              </option>
            ))}
          </select>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              title="Reset"
              className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-white border border-white/10 transition-colors shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Event Table / Cards */}
      {isLoading ? (
        <div className="py-16">
          <LoadingSpinner message="Fetching event records..." />
        </div>
      ) : (
        <EventTable
          events={events}
          onEdit={handleOpenEdit}
          onDelete={handleDeletePrompt}
          onViewRegistrations={handleViewRegistrations}
        />
      )}

      {/* Add / Edit Event Modal */}
      <EventFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingEvent}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to permanently delete "${eventToDelete?.title}"? All associated student registrations will also be removed.`}
        confirmText="Delete Event"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminEventsPage;
