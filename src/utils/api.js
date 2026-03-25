import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://edubackend-56k8.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const collegeAPI = {
  getAll: (params) => api.get('/colleges', { params }),
  getBySlug: (slug) => api.get(`/colleges/${slug}`),
  getById: (id) => api.get(`/colleges/id/${id}`),
  getFeatured: () => api.get('/colleges/featured'),
  getStates: () => api.get('/colleges/states'),
  getCities: (state) => api.get('/colleges/cities', { params: { state } })
};

export const streamAPI = {
  getAll: () => api.get('/streams'),
  getBySlug: (slug) => api.get(`/streams/${slug}`)
};

export const courseAPI = {
  getAll: (streamId) => api.get('/courses', { params: { stream: streamId } }),
  getBySlug: (slug) => api.get(`/courses/${slug}`)
};

export const examAPI = {
  getAll: (params) => api.get('/exams', { params }),
  getBySlug: (slug) => api.get(`/exams/${slug}`),
  getFeatured: () => api.get('/exams/featured')
};

export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getFeatured: () => api.get('/blogs/featured'),
  getCategories: () => api.get('/blogs/categories')
};

export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getBySlug: (slug) => api.get(`/news/${slug}`),
  getFeatured: () => api.get('/news/featured'),
  getBreaking: () => api.get('/news/breaking')
};

export const leadAPI = {
  create: (data) => api.post('/leads', data)
};

export const sliderAPI = {
  getAll: () => api.get('/sliders')
};

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile')
};

export default api;
