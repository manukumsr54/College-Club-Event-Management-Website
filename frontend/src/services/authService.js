import api from './api';

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  if (res.data.token) {
    localStorage.setItem('codechef_admin_token', res.data.token);
    localStorage.setItem('codechef_admin_user', JSON.stringify(res.data.admin));
  }
  return res.data;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    console.warn('Logout API error:', err);
  } finally {
    localStorage.removeItem('codechef_admin_token');
    localStorage.removeItem('codechef_admin_user');
  }
};

export const getCurrentAdmin = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get('/stats/dashboard');
  return res.data;
};
