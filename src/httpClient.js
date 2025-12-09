require('dotenv').config();
const axios = require('axios');
const { getToken } = require('./auth');

// Default to localhost so tests can mock endpoints without requiring a real API
const baseURL = process.env.API_BASE_URL || 'http://localhost';

const client = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to inject Authorization header
client.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (err) {
    // If token can't be obtained, continue without it. Tests can decide to skip.
  }
  return config;
});

module.exports = client;
