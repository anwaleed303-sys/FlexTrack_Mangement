import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://flextrack-be-production.up.railway.app/api";

// ============================================
// TYPES
// ============================================

interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    specificRole: string;
    profileImage?: string;
    shift?: string;
  };
  companyEmail: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Late" | "Half-Day";
  shift: string;
  workDuration: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface CheckInStatus {
  isCheckedIn: boolean;
  hasMarkedToday: boolean;
  attendance: AttendanceRecord | null;
  checkInTime?: string;
  checkOutTime?: string;
  workDuration?: string;
}

interface AttendanceState {
  // Check-in/Check-out state
  checkInStatus: CheckInStatus | null;
  currentAttendance: AttendanceRecord | null;

  // All attendance records
  attendanceRecords: AttendanceRecord[];
  totalRecords: number;

  // Loading states
  loading: boolean;
  checkInLoading: boolean;
  checkOutLoading: boolean;
  statusLoading: boolean;

  // Error state
  error: string | null;

  // Success messages
  successMessage: string | null;
}

// ============================================
// AUTH CONFIG
// ============================================

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ============================================
// ASYNC THUNKS
// ============================================

// Check In (Employee only)
export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/attendance/check-in`,
        {},
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check in"
      );
    }
  }
);

// Check Out (Employee only)
export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance/check-out`,
        {},
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check out"
      );
    }
  }
);

// Get Check-In Status (Employee only)
export const getCheckInStatus = createAsyncThunk(
  "attendance/getCheckInStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/check-in-status`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get check-in status"
      );
    }
  }
);

// Get All Attendance Records (with filters)
export const getAllAttendance = createAsyncThunk(
  "attendance/getAllAttendance",
  async (
    filters: {
      startDate?: string;
      endDate?: string;
      status?: string;
      department?: string;
      shift?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${API_URL}/attendance/list`, {
        ...getAuthConfig(),
        params: filters,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance records"
      );
    }
  }
);

// Create Attendance (Admin only)
export const createAttendance = createAsyncThunk(
  "attendance/createAttendance",
  async (
    data: {
      employeeId: string;
      date: string;
      checkIn?: string;
      checkOut?: string;
      status: string;
      shift?: string;
      notes?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/attendance/create`,
        data,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create attendance"
      );
    }
  }
);

// Update Attendance (Admin only)
export const updateAttendance = createAsyncThunk(
  "attendance/updateAttendance",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        checkIn?: string;
        checkOut?: string;
        status?: string;
        shift?: string;
        notes?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance/${id}`,
        data,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update attendance"
      );
    }
  }
);

// Delete Attendance (Admin only)
export const deleteAttendance = createAsyncThunk(
  "attendance/deleteAttendance",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/attendance/${id}`,
        getAuthConfig()
      );
      return { id, message: response.data.message };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete attendance"
      );
    }
  }
);

// Export Attendance to CSV
export const exportAttendanceCSV = createAsyncThunk(
  "attendance/exportCSV",
  async (
    filters: {
      startDate?: string;
      endDate?: string;
      status?: string;
      department?: string;
      shift?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${API_URL}/attendance/export-csv`, {
        ...getAuthConfig(),
        params: filters,
        responseType: "blob",
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `attendance_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      return { success: true, message: "CSV exported successfully" };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export CSV"
      );
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState: AttendanceState = {
  checkInStatus: null,
  currentAttendance: null,
  attendanceRecords: [],
  totalRecords: 0,
  loading: false,
  checkInLoading: false,
  checkOutLoading: false,
  statusLoading: false,
  error: null,
  successMessage: null,
};

// ============================================
// SLICE
// ============================================

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetAttendance: (state) => {
      state.checkInStatus = null;
      state.currentAttendance = null;
      state.attendanceRecords = [];
      state.totalRecords = 0;
      state.loading = false;
      state.checkInLoading = false;
      state.checkOutLoading = false;
      state.statusLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // ============================================
    // Check In
    // ============================================
    builder
      .addCase(checkIn.pending, (state) => {
        state.checkInLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.checkInLoading = false;
        state.currentAttendance = action.payload.attendance;
        state.checkInStatus = {
          isCheckedIn: true,
          hasMarkedToday: true,
          attendance: action.payload.attendance,
          checkInTime: action.payload.checkInTime,
        };
        state.successMessage = "Checked in successfully!";
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.checkInLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Check Out
    // ============================================
    builder
      .addCase(checkOut.pending, (state) => {
        state.checkOutLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.checkOutLoading = false;
        state.currentAttendance = action.payload.attendance;
        if (state.checkInStatus) {
          state.checkInStatus = {
            ...state.checkInStatus,
            isCheckedIn: false,
            attendance: action.payload.attendance,
            checkOutTime: action.payload.checkOutTime,
            workDuration: action.payload.workDuration,
          };
        }
        state.successMessage = "Checked out successfully!";
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.checkOutLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Get Check-In Status
    // ============================================
    builder
      .addCase(getCheckInStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(getCheckInStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.checkInStatus = action.payload;
        if (action.payload.attendance) {
          state.currentAttendance = action.payload.attendance;
        }
      })
      .addCase(getCheckInStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Get All Attendance
    // ============================================
    builder
      .addCase(getAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload.attendance;
        state.totalRecords = action.payload.count;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Create Attendance (Admin)
    // ============================================
    builder
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords.unshift(action.payload.attendance);
        state.totalRecords += 1;
        state.successMessage = "Attendance created successfully!";
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Update Attendance (Admin)
    // ============================================
    builder
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attendanceRecords.findIndex(
          (record) => record._id === action.payload.attendance._id
        );
        if (index !== -1) {
          state.attendanceRecords[index] = action.payload.attendance;
        }
        state.successMessage = "Attendance updated successfully!";
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Delete Attendance (Admin)
    // ============================================
    builder
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = state.attendanceRecords.filter(
          (record) => record._id !== action.payload.id
        );
        state.totalRecords -= 1;
        state.successMessage = "Attendance deleted successfully!";
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Export CSV
    // ============================================
    builder
      .addCase(exportAttendanceCSV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportAttendanceCSV.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "CSV exported successfully!";
      })
      .addCase(exportAttendanceCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccessMessage, resetAttendance } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
