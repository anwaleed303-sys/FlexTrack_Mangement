// // src/services/api.ts
// import axios from "axios";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to requests if available
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle response errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("loggedInUser");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API calls
// export const authAPI = {
//   // Register Main Admin
//   registerAdmin: async (data: any) => {
//     const response = await api.post("/auth/register-admin", data);
//     return response.data;
//   },

//   // Register Employee
//   registerEmployee: async (data: any) => {
//     const response = await api.post("/auth/register-employee", data);
//     return response.data;
//   },

//   // Login
//   login: async (email: string, password: string) => {
//     const response = await api.post("/auth/login", { email, password });
//     return response.data;
//   },

//   // Verify Admin Password
//   verifyAdmin: async (adminPassword: string) => {
//     const response = await api.post("/auth/verify-admin", { adminPassword });
//     return response.data;
//   },

//   // Get Current User
//   getMe: async () => {
//     const response = await api.get("/auth/me");
//     return response.data;
//   },
// };

// export default api;

import axios from "axios";

const API_BASE_URL =
  // process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flextrack-be-production.up.railway.app/api";

console.log("🔍 API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", config.method?.toUpperCase(), config.url);

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  registerAdmin: async (data: any) => {
    console.log("🔵 API: registerAdmin");
    const response = await api.post("/auth/register-admin", data);
    return response.data;
  },

  registerEmployee: async (data: any) => {
    console.log("🔵 API: registerEmployee");
    const response = await api.post("/auth/register-employee", data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    console.log("🔵 API: login", { email });
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getMe: async () => {
    console.log("🔵 API: getMe");
    const response = await api.get("/auth/me");
    return response.data;
  },

  // ✅ ADD THIS
  forgotPassword: async (email: string) => {
    console.log("🔵 API: forgotPassword", { email });
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // ✅ ADD THIS
  resetPassword: async (resetToken: string, password: string) => {
    console.log("🔵 API: resetPassword");
    const response = await api.post(`/auth/reset-password/${resetToken}`, {
      password,
    });
    return response.data;
  },
};

export default api;
