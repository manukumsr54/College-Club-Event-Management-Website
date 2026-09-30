import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Search, Download, RefreshCw, Filter, Trash2 } from 'lucide-react';
import RegistrationTable from '../../components/admin/RegistrationTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAllRegistrations, deleteRegistration } from '../../services/registrationService';
import { getEvents } from '../../services/eventService';
import { useToast } from '../../contexts/ToastContext';
import { COLLEGE_YEARS } from '../../utils/constants';

const AdminRegistrationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialEventId = searchParams.get('eventId') || 'all';

  const toast = useToast();
  const [registrations, setRegistrations] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [selectedYear, setSelectedYear] = useState('all');

  // Delete registration state
  const [regToDelete, setRegToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load events list for event filter dropdown
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await getEvents();
        if (res.success && res.data) {
          setEventsList(res.data);
        }
      } catch (err) {
        console.error('Failed to load events for filter:', err);
      }
    };
    loadEvents();
  }, []);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const res = await getAllRegistrations({
        search: searchQuery,
        eventId: selectedEventId,
        year: selectedYear,
      });
      if (res.success && res.data) {
        setRegistrations(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load registrations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRegistrations();
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedEventId, selectedYear]);

  const handleExportCSV = () => {
    if (!registrations || registrations.length === 0) {
      toast.error('No registrations available to export.');
      return;
    }

    const headers = ['ID', 'Student Name', 'Email', 'College', 'Year', 'Phone', 'Event Title', 'Registration Date'];
    const rows = registrations.map((r) => [
      `REG-${r.id}`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.college.replace(/"/g, '""')}"`,
      `"${r.year}"`,
      `"${r.phone}"`,
      `"${(r.event_title || '').replace(/"/g, '""')}"`,
      `"${r.created_at}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `club_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Registration list exported to CSV successfully!');
  };

  const handleDeletePrompt = (reg) => {
    setRegToDelete(reg);
  };

  const handleConfirmDelete = async () => {
    if (!regToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteRegistration(regToDelete.id);
      if (res.success) {
        toast.success(res.message || 'Registration deleted.');
        setRegToDelete(null);
        fetchRegistrations();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete registration.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedEventId('all');
    setSelectedYear('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Registered Students Database</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time student sign-ups, filter by event or year, and export attendee rosters.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={registrations.length === 0}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Download className="w-4 h-4 text-accent-cyan" />
          <span>Export CSV Roster</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search by Name, Email, College, or Event */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, college, or event..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card text-white text-xs border border-white/5 focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>

          {/* Filter by Event */}
          <div className="md:col-span-3">
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                if (e.target.value === 'all') {
                  searchParams.delete('eventId');
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ eventId: e.target.value });
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl glass-card text-white bg-dark-900 border border-white/10 text-xs focus:outline-none focus:border-brand-500 truncate"
            >
              <option value="all" className="bg-dark-900 text-white">
                All Events ({eventsList.length})
              </option>
              {eventsList.map((e) => (
                <option key={e.id} value={e.id} className="bg-dark-900 text-white">
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Year */}
          <div className="md:col-span-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-card text-white bg-dark-900 border border-white/10 text-xs focus:outline-none focus:border-brand-500"
            >
              <option value="all" className="bg-dark-900 text-white">
                All Years
              </option>
              {COLLEGE_YEARS.map((y) => (
                <option key={y} value={y} className="bg-dark-900 text-white">
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-1 flex items-center justify-end">
            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="w-full py-2.5 rounded-xl glass-card text-slate-400 hover:text-white border border-white/10 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
          <span>
            Total registrations matching criteria: <strong className="text-white">{registrations.length}</strong>
          </span>
          {selectedEventId !== 'all' && (
            <span className="text-brand-300 font-medium">Filtered by selected event</span>
          )}
        </div>
      </div>

      {/* Registrations Table */}
      {isLoading ? (
        <div className="py-16">
          <LoadingSpinner message="Querying registered students from PostgreSQL..." />
        </div>
      ) : (
        <RegistrationTable
          registrations={registrations}
          onDelete={handleDeletePrompt}
          onExportCSV={handleExportCSV}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!regToDelete}
        onClose={() => setRegToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Registration"
        message={`Are you sure you want to remove the registration for "${regToDelete?.name}" (${regToDelete?.email})? This action cannot be reversed.`}
        confirmText="Remove Registration"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminRegistrationsPage;
