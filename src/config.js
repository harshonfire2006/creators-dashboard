// src/config.js
export const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://creator-dashboard-api-rbzj.onrender.com' 
  : 'http://localhost:5000';