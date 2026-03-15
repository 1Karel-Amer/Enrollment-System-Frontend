import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

// Attach authentication token automatically
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ----------------------------
// AUTH FUNCTIONS
// ----------------------------
export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");

// ----------------------------
// DASHBOARD FUNCTIONS
// ----------------------------
export const getDashboardStats = () => api.get("/dashboard-stats");
export const getAttendanceData = () => api.get("/attendance-data");

// ----------------------------
// PROGRAM FUNCTIONS
// ----------------------------
export const getPrograms = () => api.get("/programs");
export const getProgramDetails = (id) => api.get(`/programs/${id}`);

// ----------------------------
// SUBJECT FUNCTIONS
// ----------------------------
export const getSubjects = () => api.get("/subjects");
export const getSubjectDetails = (id) => api.get(`/subjects/${id}`);

export default api;
