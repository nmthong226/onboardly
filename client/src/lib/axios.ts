// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Corrected the base URL
  timeout: 5000,
});

export default api;