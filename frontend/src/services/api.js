// base url for routes calling
// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marking the request to avoid infinite loops
      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refresh");
        const accessToken=localStorage.getItem("access");
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refreshToken,

        },
      { headers: {

        // "Content-Type": "application/json", 
        "access": `Bearer ${accessToken}`
      }
      }
      );
        const access = response.data.access;
        // Update local storage with the new tokens
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", response.data.refresh);
        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle failed refresh here (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    // For other types of errors, just pass them along
    return Promise.reject(error);
  }
);

export default api;
