import React from 'react';
import { Trash2, Mail, Phone, School, Calendar, Download, User } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const RegistrationTable = ({ registrations, onDelete, onExportCSV }) => {
  if (!registrations || registrations.length === 0) {
    return (
      <div className="glass-panel p-10 rounded-2xl text-center border border-white/5">
        <p className="text-slate-400 text-sm">No registrations match your search and filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl glass-panel border border-white/10">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase font-bold text-slate-400 border-b border-white/10 tracking-wider">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">College / Year</th>
              <th className="px-6 py-4">Event Registered</th>
              <th className="px-6 py-4">Date Registered</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                {/* Student Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 flex items-center justify-center font-bold text-xs">
                      {reg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold">{reg.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">REG-{reg.id}</span>
                    </div>
                  </div>
                </td>

                {/* Email & Phone */}
                <td className="px-6 py-4">
                  <p className="text-slate-200 flex items-center gap-1.5 text-xs">
                    <Mail className="w-3.5 h-3.5 text-brand-400" />
                    <span className="truncate">{reg.email}</span>
                  </p>
                  <p className="text-slate-400 flex items-center gap-1.5 text-xs mt-1">
                    <Phone className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{reg.phone}</span>
                  </p>
                </td>

                {/* College & Year */}
                <td className="px-6 py-4">
                  <p className="text-white font-medium text-xs truncate max-w-xs">{reg.college}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-brand-300 border border-white/10">
                    {reg.year}
                  </span>
                </td>

                {/* Event */}
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-brand-300 font-semibold text-xs truncate">
                    {reg.event_title || `Event #${reg.event_id}`}
                  </p>
                  {reg.event_category && (
                    <span className="text-[10px] text-slate-400 block mt-0.5">{reg.event_category}</span>
                  )}
                </td>

                {/* Registration Date */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                  {formatDate(reg.created_at)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => onDelete(reg)}
                    title="Remove Registration"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card Layout */}
      <div className="lg:hidden space-y-3">
        {registrations.map((reg) => (
          <div key={reg.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 flex items-center justify-center font-bold text-sm">
                  {reg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{reg.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">ID: REG-{reg.id}</span>
                </div>
              </div>

              <button
                onClick={() => onDelete(reg)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-1.5 pt-2 border-t border-white/5 text-slate-300">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span className="truncate">{reg.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                <span>{reg.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{reg.college} ({reg.year})</span>
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-brand-300 font-semibold truncate max-w-[200px]">
                {reg.event_title || `Event #${reg.event_id}`}
              </span>
              <span className="text-slate-400 text-[11px] shrink-0">{formatDate(reg.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationTable;
