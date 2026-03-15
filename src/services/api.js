import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// --- AUTHENTICATION INTERCEPTOR ---
// This ensures the professor sees the 'Bearer Token' in every request header
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// --- AUTH FUNCTIONS ---
export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");

// --- DASHBOARD FUNCTIONS ---
export const getDashboardStats = () => api.get("/dashboard-stats");
export const getAttendanceData = () => api.get("/attendance-data");

// --- PROGRAM FUNCTIONS ---
export const getPrograms = () => api.get("/programs");
export const getProgramDetails = (id) => api.get(`/programs/${id}`);

// --- SUBJECT FUNCTIONS ---
// 1. Fetching
export const getSubjects = (params) => api.get("/subjects", { params });
export const getSubjectDetails = (id) => api.get(`/subjects/${id}`);

// 2. Actions (Added these for your Save/Archive buttons)
export const createSubject = (data) => api.post("/subjects", data);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// 3. Optional: Restore from Archive
export const restoreSubject = (id) => api.post(`/subjects/${id}/restore`);

export default api;
