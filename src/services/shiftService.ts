// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// // Get token from localStorage
// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
// };

// // ============================================
// // ADMIN SERVICES
// // ============================================

// export const getDepartments = async () => {
//   try {
//     const response = await axios.get(
//       `${API_URL}/shift/departments`,
//       getAuthHeader()
//     );
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// export const assignShift = async (data: any) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/shift/assign`,
//       data,
//       getAuthHeader()
//     );
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// export const getShiftAssignments = async (params: any = {}) => {
//   try {
//     const response = await axios.get(`${API_URL}/shift/assignments`, {
//       ...getAuthHeader(),
//       params,
//     });
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// // ============================================
// // EMPLOYEE SERVICES
// // ============================================

// export const createShiftRequest = async (data: any) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/shift/request`,
//       data,
//       getAuthHeader()
//     );
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// export const getShiftRequests = async (status: string = "all") => {
//   try {
//     const response = await axios.get(`${API_URL}/shift/requests`, {
//       ...getAuthHeader(),
//       params: { status },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// export const reviewShiftRequest = async (id: string, data: any) => {
//   try {
//     const response = await axios.put(
//       `${API_URL}/shift/request/${id}/review`,
//       data,
//       getAuthHeader()
//     );
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

// export const getEmployeeWeeklySchedule = async (
//   startDate: string,
//   endDate: string
// ) => {
//   try {
//     const response = await axios.get(`${API_URL}/shift/employee/weekly`, {
//       ...getAuthHeader(),
//       params: { startDate, endDate },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || error.message;
//   }
// };

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// const API_URL =
//   process.env.REACT_APP_API_URL ||
//   "https://flextrack-be-production.up.railway.app/api";

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ============================================
// ADMIN SERVICES
// ============================================

export const getDepartments = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/shift/departments`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const assignShift = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/shift/assign`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getShiftAssignments = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_URL}/shift/assignments`, {
      ...getAuthHeader(),
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ ADD THIS NEW FUNCTION
export const getEmployees = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/employees/all`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ============================================
// EMPLOYEE SERVICES
// ============================================

export const createShiftRequest = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/shift/request`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getShiftRequests = async (status: string = "all") => {
  try {
    const response = await axios.get(`${API_URL}/shift/requests`, {
      ...getAuthHeader(),
      params: { status },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const reviewShiftRequest = async (id: string, data: any) => {
  try {
    const response = await axios.put(
      `${API_URL}/shift/request/${id}/review`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const getEmployeeWeeklySchedule = async (
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(`${API_URL}/shift/employee/weekly`, {
      ...getAuthHeader(),
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
