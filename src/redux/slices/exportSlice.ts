import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://flextrack-be-production.up.railway.app/";

interface AttendanceRecord {
  _id: string;
  employeeId: {
    name: string;
    email: string;
    specificRole: string;
    profileImage?: string;
    shift?: string;
  };
  date: string;
  checkIn: string;
  checkOut: string;
  workingTime: string;
  status: string;
  workingHours?: number;
}

interface ReportRecord {
  name: string;
  email?: string;
  date?: string;
  role?: string;
  [key: string]: any;
}

interface ReportState {
  attendanceRecords: AttendanceRecord[];
  overtimeRecords: ReportRecord[];
  payrollRecords: ReportRecord[];
  productivityRecords: ReportRecord[];
  loading: boolean;
  error: string | null;
  exportLoading: boolean;
}

const initialState: ReportState = {
  attendanceRecords: [],
  overtimeRecords: [],
  payrollRecords: [],
  productivityRecords: [],
  loading: false,
  error: null,
  exportLoading: false,
};

// Thunks for fetching reports
export const fetchAttendanceReport = createAsyncThunk(
  "export/fetchAttendanceReport",
  async (
    params: {
      startDate?: string;
      endDate?: string;
      employeeEmail?: string;
      department?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.employeeEmail && params.employeeEmail !== "all") {
        queryParams.append("employeeEmail", params.employeeEmail);
      }
      if (params.department)
        queryParams.append("department", params.department);

      const response = await axios.get(
        `${API_URL}/api/report/attendance?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.records;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance report"
      );
    }
  }
);

export const fetchOvertimeReport = createAsyncThunk(
  "export/fetchOvertimeReport",
  async (
    params: {
      startDate?: string;
      endDate?: string;
      employeeEmail?: string;
      department?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.employeeEmail && params.employeeEmail !== "all") {
        queryParams.append("employeeEmail", params.employeeEmail);
      }
      if (params.department)
        queryParams.append("department", params.department);

      const response = await axios.get(
        `${API_URL}/api/report/overtime?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.records;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch overtime report"
      );
    }
  }
);

export const fetchPayrollReport = createAsyncThunk(
  "export/fetchPayrollReport",
  async (
    params: {
      startDate?: string;
      endDate?: string;
      employeeEmail?: string;
      department?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.employeeEmail && params.employeeEmail !== "all") {
        queryParams.append("employeeEmail", params.employeeEmail);
      }
      if (params.department)
        queryParams.append("department", params.department);

      const response = await axios.get(
        `${API_URL}/api/report/payroll?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.records;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payroll report"
      );
    }
  }
);

export const fetchProductivityReport = createAsyncThunk(
  "export/fetchProductivityReport",
  async (
    params: {
      startDate?: string;
      endDate?: string;
      employeeEmail?: string;
      department?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.employeeEmail && params.employeeEmail !== "all") {
        queryParams.append("employeeEmail", params.employeeEmail);
      }
      if (params.department)
        queryParams.append("department", params.department);

      const response = await axios.get(
        `${API_URL}/api/report/productivity?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.records;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch productivity report"
      );
    }
  }
);

export const exportReport = createAsyncThunk(
  "export/exportReport",
  async (
    params: {
      reportType: string;
      format: string;
      startDate?: string;
      endDate?: string;
      employeeEmail?: string;
      department?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();

      queryParams.append("reportType", params.reportType);
      queryParams.append("format", params.format);
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.employeeEmail && params.employeeEmail !== "all") {
        queryParams.append("employeeEmail", params.employeeEmail);
      }
      if (params.department)
        queryParams.append("department", params.department);

      const response = await axios.get(
        `${API_URL}/api/report/export?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Create download link
      const blob = new Blob([response.data], {
        type: params.format === "csv" ? "text/csv" : "text/plain",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${params.reportType.replace(/ /g, "_")}_${Date.now()}.${params.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to export report"
      );
    }
  }
);

const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    clearReports: (state) => {
      state.attendanceRecords = [];
      state.overtimeRecords = [];
      state.payrollRecords = [];
      state.productivityRecords = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Attendance Report
    builder
      .addCase(fetchAttendanceReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Overtime Report
    builder
      .addCase(fetchOvertimeReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOvertimeReport.fulfilled, (state, action) => {
        state.loading = false;
        state.overtimeRecords = action.payload;
      })
      .addCase(fetchOvertimeReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Payroll Report
    builder
      .addCase(fetchPayrollReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayrollReport.fulfilled, (state, action) => {
        state.loading = false;
        state.payrollRecords = action.payload;
      })
      .addCase(fetchPayrollReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Productivity Report
    builder
      .addCase(fetchProductivityReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductivityReport.fulfilled, (state, action) => {
        state.loading = false;
        state.productivityRecords = action.payload;
      })
      .addCase(fetchProductivityReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Export Report
    builder
      .addCase(exportReport.pending, (state) => {
        state.exportLoading = true;
        state.error = null;
      })
      .addCase(exportReport.fulfilled, (state) => {
        state.exportLoading = false;
      })
      .addCase(exportReport.rejected, (state, action) => {
        state.exportLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReports, clearError } = exportSlice.actions;
export default exportSlice.reducer;
