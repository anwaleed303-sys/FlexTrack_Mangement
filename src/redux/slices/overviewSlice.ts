import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flextrack-be-production.up.railway.app/api";

// ============================================
// TYPES
// ============================================

// Admin Stats
interface AdminStats {
  totalEmployees: number;
  todayPresent: number;
  todayAbsent: number;
  presentPercentage: number;
}

// Employee Stats
interface EmployeeStats {
  weeklyHours: string;
  weeklyTarget: number;
  currentShift: string;
  customShift: string | null;
  daysPresent: number;
}

// Combined Stats (can be either admin or employee)
interface OverviewStats {
  stats: AdminStats | EmployeeStats;
  userRole?: string;
}

interface AttendanceTrendData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

interface DepartmentAttendance {
  department: string;
  total: number;
  present: number;
  absent: number;
  presentPercentage: number;
}

interface RecentAttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    specificRole: string;
    profileImage?: string;
  };
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Late" | "Half-Day";
  shift: string;
  workDuration: string;
}

// Weekly Stats for chart
interface WeeklyStatsData {
  day: string;
  date: string;
  present: number;
  absent: number;
}

// Attendance History for employee
interface AttendanceHistoryData {
  day: string;
  date: string;
  fullDate: string;
  actualHours: number;
  targetHours: number;
  status: string;
}

interface OverviewState {
  stats: OverviewStats | null;
  weeklyStats: WeeklyStatsData[];
  attendanceHistory: AttendanceHistoryData[];
  attendanceTrend: AttendanceTrendData[];
  departmentAttendance: DepartmentAttendance[];
  recentAttendance: RecentAttendanceRecord[];
  loading: boolean;
  statsLoading: boolean;
  weeklyLoading: boolean;
  historyLoading: boolean;
  error: string | null;
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

// Fetch Overview Stats (Dashboard stats for both admin and employee)
export const fetchOverviewStats = createAsyncThunk(
  "overview/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/overview/stats`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch overview stats"
      );
    }
  }
);

// Fetch Weekly Stats (for This Week's Attendance chart)
export const fetchWeeklyStats = createAsyncThunk(
  "overview/fetchWeeklyStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/weekly-stats`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weekly stats"
      );
    }
  }
);

// Fetch Employee Attendance History (for My Attendance Snapshot)
export const fetchAttendanceHistory = createAsyncThunk(
  "overview/fetchAttendanceHistory",
  async (days: number = 7, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/attendance/my-history`, {
        ...getAuthConfig(),
        params: { days },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance history"
      );
    }
  }
);

// Fetch Attendance Trend (for admin dashboard charts)
export const fetchAttendanceTrend = createAsyncThunk(
  "overview/fetchTrend",
  async ({ days = 7 }: { days?: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/overview/attendance-trend`, {
        ...getAuthConfig(),
        params: { days },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance trend"
      );
    }
  }
);

// Fetch Department Attendance (Admin only)
export const fetchDepartmentAttendance = createAsyncThunk(
  "overview/fetchDepartmentAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/overview/department-attendance`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch department attendance"
      );
    }
  }
);

// Fetch Recent Attendance
export const fetchRecentAttendance = createAsyncThunk(
  "overview/fetchRecentAttendance",
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/overview/recent-attendance`,
        {
          ...getAuthConfig(),
          params: { limit },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent attendance"
      );
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState: OverviewState = {
  stats: null,
  weeklyStats: [],
  attendanceHistory: [],
  attendanceTrend: [],
  departmentAttendance: [],
  recentAttendance: [],
  loading: false,
  statsLoading: false,
  weeklyLoading: false,
  historyLoading: false,
  error: null,
};

// ============================================
// SLICE
// ============================================

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetOverview: (state) => {
      state.stats = null;
      state.weeklyStats = [];
      state.attendanceHistory = [];
      state.attendanceTrend = [];
      state.departmentAttendance = [];
      state.recentAttendance = [];
      state.loading = false;
      state.statsLoading = false;
      state.weeklyLoading = false;
      state.historyLoading = false;
      state.error = null;
    },
    // Update weekly stats locally (for real-time updates after check-in/out)
    updateWeeklyStatsLocally: (
      state,
      action: PayloadAction<WeeklyStatsData[]>
    ) => {
      state.weeklyStats = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ============================================
    // Fetch Overview Stats
    // ============================================
    builder
      .addCase(fetchOverviewStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchOverviewStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Fetch Weekly Stats
    // ============================================
    builder
      .addCase(fetchWeeklyStats.pending, (state) => {
        state.weeklyLoading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyStats.fulfilled, (state, action) => {
        state.weeklyLoading = false;
        state.weeklyStats = action.payload.weekData;
      })
      .addCase(fetchWeeklyStats.rejected, (state, action) => {
        state.weeklyLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Fetch Attendance History (Employee)
    // ============================================
    builder
      .addCase(fetchAttendanceHistory.pending, (state) => {
        state.historyLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.attendanceHistory = action.payload.attendance;
      })
      .addCase(fetchAttendanceHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Fetch Attendance Trend
    // ============================================
    builder
      .addCase(fetchAttendanceTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceTrend = action.payload.trend;
      })
      .addCase(fetchAttendanceTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Fetch Department Attendance
    // ============================================
    builder
      .addCase(fetchDepartmentAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentAttendance = action.payload.departments;
      })
      .addCase(fetchDepartmentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // Fetch Recent Attendance
    // ============================================
    builder
      .addCase(fetchRecentAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.recentAttendance = action.payload.attendance;
      })
      .addCase(fetchRecentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetOverview, updateWeeklyStatsLocally } =
  overviewSlice.actions;
export default overviewSlice.reducer;
