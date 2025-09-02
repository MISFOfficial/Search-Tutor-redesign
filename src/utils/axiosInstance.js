// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://search-tutor-server-bay.vercel.app",
});

// 🔐 Automatically attach token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
