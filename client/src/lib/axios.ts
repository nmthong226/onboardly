// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://onboardly-backend.vercel.app/api", // Corrected the base URL
  timeout: 5000,
});

export default api;