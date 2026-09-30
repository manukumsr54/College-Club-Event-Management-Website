import React from 'react';
import { EVENT_CATEGORIES, CATEGORY_COLORS } from '../../utils/constants';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
      {EVENT_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const colorConfig = CATEGORY_COLORS[cat];

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border flex items-center gap-2 ${
              isSelected
                ? 'bg-brand-600 text-white border-brand-500 shadow-glow'
                : 'glass-card text-slate-300 border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {colorConfig && cat !== 'All' && (
              <span className={`w-1.5 h-1.5 rounded-full ${colorConfig.dot}`} />
            )}
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
