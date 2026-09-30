// Format date into human readable e.g., "Oct 15, 2026"
export const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  try {
    // Handle YYYY-MM-DD cleanly without timezone shift
    const parts = dateString.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

// Format short date with day of week e.g. "Thu, Oct 15"
export const formatShortDate = (dateString) => {
  if (!dateString) return 'TBA';
  try {
    const parts = dateString.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

// Check if an event date is upcoming or past
export const isUpcoming = (dateString) => {
  if (!dateString) return false;
  const parts = dateString.split('T')[0].split('-');
  const eventDate = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59);
  return eventDate >= new Date();
};

// Truncate string with ellipsis
export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
