import React from 'react';

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme = 'indigo',
  onClick,
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20',
      text: 'text-brand-400',
      glow: 'shadow-glow',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      glow: 'shadow-glow-cyan',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      glow: 'shadow-lg shadow-emerald-950/20',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      glow: 'shadow-lg shadow-amber-950/20',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-6 rounded-2xl border ${scheme.border} relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
        onClick ? 'cursor-pointer hover:border-white/20' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-white tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium pt-1 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3.5 rounded-2xl ${scheme.bg} ${scheme.border} border ${scheme.text} ${scheme.glow}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
