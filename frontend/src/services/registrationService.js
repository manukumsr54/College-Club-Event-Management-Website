import api from './api';

export const registerForEvent = async (registrationData) => {
  const res = await api.post('/registrations', registrationData);
  return res.data;
};

export const getAllRegistrations = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.eventId && params.eventId !== 'all') query.append('eventId', params.eventId);
  if (params.year && params.year !== 'all') query.append('year', params.year);

  const res = await api.get(`/registrations?${query.toString()}`);
  return res.data;
};

export const getRegistrationsByEvent = async (eventId) => {
  const res = await api.get(`/registrations/event/${eventId}`);
  return res.data;
};

export const deleteRegistration = async (id) => {
  const res = await api.delete(`/registrations/${id}`);
  return res.data;
};
