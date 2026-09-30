import api from './api';

export const getEvents = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.featured !== undefined) query.append('featured', params.featured);
  if (params.upcoming !== undefined) query.append('upcoming', params.upcoming);
  if (params.limit) query.append('limit', params.limit);

  const res = await api.get(`/events?${query.toString()}`);
  return res.data;
};

export const getFeaturedEvent = async () => {
  const res = await api.get('/events/featured');
  return res.data;
};

export const getEventById = async (id) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const createEvent = async (eventData) => {
  const res = await api.post('/events', eventData);
  return res.data;
};

export const updateEvent = async (id, eventData) => {
  const res = await api.put(`/events/${id}`, eventData);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};
