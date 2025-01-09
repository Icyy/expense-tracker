import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Axios instance for reusable config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const getExpenses = async () => {
    const token = localStorage.getItem('token');  // Get the token from local storage
    if (!token) {
      throw new Error("No token found");  // Handle case if no token is found
    }
  
    const response = await api.get('/expenses', {
      headers: {
        Authorization: `Bearer ${token}`  // Include the token in the Authorization header
      }
    });
  
    return response.data;
};

export const addExpense = async (expense) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export default api;
