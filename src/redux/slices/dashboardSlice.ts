// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// // ============================================
// // TYPES
// // ============================================

// interface Employee {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
//   specificRole: string;
//   shift?: string;
//   weeklyHours?: number;
//   payAmount?: number;
// }

// interface AttendanceRecord {
//   _id: string;
//   employeeId: {
//     _id: string;
//     name: string;
//     email: string;
//     specificRole: string;
//     shift?: string;
//   };
//   date: string;
//   checkIn: string;
//   checkOut?: string;
//   workingTime?: string;
//   status: "Present" | "Absent" | "Late" | "Half-Day";
//   workingHours?: number;
//   notes?: string;
// }

// interface LeaveRequest {
//   _id: string;
//   employeeId?: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   employeeName: string;
//   leaveType: string;
//   startDate: string;
//   endDate: string;
//   totalDays?: number;
//   reason: string;
//   status: "Pending" | "Approved" | "Rejected";
//   isCompanyWide?: boolean;
//   holidayTitle?: string;
//   approvedBy?: string;
//   approvedDate?: string;
//   rejectedBy?: string;
//   rejectedDate?: string;
//   rejectionReason?: string;
//   adminNotes?: string;
//   reviewedBy?: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   reviewedAt?: string;
//   createdAt: string;
// }

// interface StatsData {
//   totalEmployees: number;
//   presentToday: number;
//   absentees: number;
//   presentPercentage?: number;
// }

// interface WeeklyAttendanceData {
//   day: string;
//   present: number;
//   absent: number;
//   late?: number;
//   date?: string;
// }

// interface ProductivityData {
//   name: string;
//   value: number;
//   color: string;
//   [key: string]: string | number;
// }

// interface LeaveChartData {
//   name: string;
//   value: number;
//   color: string;
// }

// interface Activity {
//   id: string;
//   employee: string;
//   action: string;
//   time: string;
//   timestamp: number;
//   type: "checkin" | "checkout" | "leave" | "admin";
// }

// interface LeaveBalance {
//   employeeEmail: string;
//   employeeName: string;
//   totalLeaves: number;
//   usedLeaves: number;
//   remainingLeaves: number;
//   year: number;
// }

// interface CheckInStatus {
//   isCheckedIn: boolean;
//   hasMarkedToday: boolean;
//   checkInTime: string | null;
//   checkOutTime?: string | null;
//   workDuration?: string;
//   attendance?: AttendanceRecord;
// }

// interface DashboardState {
//   // Core Data
//   employees: Employee[];
//   attendanceRecords: AttendanceRecord[];
//   leaveRequests: LeaveRequest[];

//   // Stats & Analytics
//   statsData: StatsData;
//   weeklyAttendance: WeeklyAttendanceData[];
//   productivityData: ProductivityData[];
//   leaveChartData: LeaveChartData[];
//   activities: Activity[];
//   workHoursSummary: {
//     average: string;
//     total: number;
//   };

//   // Leave Management
//   leaveBalances: Record<string, LeaveBalance>;
//   pendingLeaveCount: number;

//   // Check-in Status
//   checkInStatus: CheckInStatus;

//   // UI States
//   loading: boolean;
//   statsLoading: boolean;
//   attendanceLoading: boolean;
//   leaveLoading: boolean;
//   error: string | null;
// }

// // ============================================
// // AUTH CONFIG
// // ============================================

// const getAuthConfig = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
// };

// // ============================================
// // ASYNC THUNKS - EMPLOYEES
// // ============================================

// export const fetchAllEmployees = createAsyncThunk(
//   "dashboard/fetchAllEmployees",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/employees/list`,
//         getAuthConfig()
//       );
//       return response.data.data.employees || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch employees"
//       );
//     }
//   }
// );

// export const searchEmployees = createAsyncThunk(
//   "dashboard/searchEmployees",
//   async (query: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/employees/search?query=${query}`,
//         getAuthConfig()
//       );
//       return response.data.data.employees || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to search employees"
//       );
//     }
//   }
// );

// // ============================================
// // ASYNC THUNKS - ATTENDANCE
// // ============================================

// export const checkIn = createAsyncThunk(
//   "dashboard/checkIn",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/attendance/check-in`,
//         {},
//         getAuthConfig()
//       );
//       return response.data.data.attendance || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to check in"
//       );
//     }
//   }
// );

// export const checkOut = createAsyncThunk(
//   "dashboard/checkOut",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/attendance/check-out`,
//         {},
//         getAuthConfig()
//       );
//       return response.data.data.attendance || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to check out"
//       );
//     }
//   }
// );

// export const fetchCheckInStatus = createAsyncThunk(
//   "dashboard/fetchCheckInStatus",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/check-in-status`,
//         getAuthConfig()
//       );
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch check-in status"
//       );
//     }
//   }
// );

// export const fetchAttendanceRecords = createAsyncThunk(
//   "dashboard/fetchAttendanceRecords",
//   async (
//     params: { startDate?: string; endDate?: string; status?: string } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       const queryParams = new URLSearchParams();
//       if (params.startDate) queryParams.append("startDate", params.startDate);
//       if (params.endDate) queryParams.append("endDate", params.endDate);
//       if (params.status) queryParams.append("status", params.status);

//       const response = await axios.get(
//         `${API_URL}/attendance/list?${queryParams.toString()}`,
//         getAuthConfig()
//       );
//       return response.data.data.attendance || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch attendance records"
//       );
//     }
//   }
// );

// export const createAttendanceRecord = createAsyncThunk(
//   "dashboard/createAttendanceRecord",
//   async (
//     data: {
//       employeeId: string;
//       date: string;
//       checkIn: string;
//       checkOut?: string;
//       status: string;
//       notes?: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/attendance/create`,
//         data,
//         getAuthConfig()
//       );
//       return response.data.data.attendance || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to create attendance record"
//       );
//     }
//   }
// );

// export const updateAttendanceRecord = createAsyncThunk(
//   "dashboard/updateAttendanceRecord",
//   async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/attendance/${id}`,
//         data,
//         getAuthConfig()
//       );
//       return response.data.data.attendance || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update attendance record"
//       );
//     }
//   }
// );

// export const deleteAttendanceRecord = createAsyncThunk(
//   "dashboard/deleteAttendanceRecord",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/attendance/${id}`, getAuthConfig());
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete attendance record"
//       );
//     }
//   }
// );

// // ============================================
// // ASYNC THUNKS - LEAVES
// // ============================================

// export const fetchMyLeaves = createAsyncThunk(
//   "dashboard/fetchMyLeaves",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/leaves/list`,
//         getAuthConfig()
//       );
//       return response.data.data.leaves || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch leaves"
//       );
//     }
//   }
// );

// export const fetchAllLeaves = createAsyncThunk(
//   "dashboard/fetchAllLeaves",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/leaves/list`,
//         getAuthConfig()
//       );
//       return response.data.data.leaves || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch all leaves"
//       );
//     }
//   }
// );

// export const createLeaveRequest = createAsyncThunk(
//   "dashboard/createLeaveRequest",
//   async (
//     data: {
//       leaveType: string;
//       startDate: string;
//       endDate: string;
//       reason: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/leaves/submit`,
//         data,
//         getAuthConfig()
//       );
//       return response.data.data.leave || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to create leave request"
//       );
//     }
//   }
// );

// export const grantLeave = createAsyncThunk(
//   "dashboard/grantLeave",
//   async (
//     data: {
//       employeeName: string;
//       leaveType: string;
//       startDate: string;
//       endDate: string;
//       reason: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/leaves/grant-leave`,
//         data,
//         getAuthConfig()
//       );
//       return response.data.data.leave || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to grant leave"
//       );
//     }
//   }
// );

// export const grantCompanyLeave = createAsyncThunk(
//   "dashboard/grantCompanyLeave",
//   async (
//     data: {
//       holidayTitle: string;
//       leaveType: string;
//       startDate: string;
//       endDate: string;
//       reason: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/leaves/grant-company-leave`,
//         data,
//         getAuthConfig()
//       );
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to grant company leave"
//       );
//     }
//   }
// );

// export const updateLeaveStatus = createAsyncThunk(
//   "dashboard/updateLeaveStatus",
//   async (
//     {
//       id,
//       status,
//       adminNotes,
//     }: { id: string; status: string; adminNotes?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/leaves/${id}/status`,
//         { status, adminNotes },
//         getAuthConfig()
//       );
//       return response.data.data.leave || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update leave status"
//       );
//     }
//   }
// );

// export const deleteLeaveRequest = createAsyncThunk(
//   "dashboard/deleteLeaveRequest",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/leaves/${id}`, getAuthConfig());
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete leave request"
//       );
//     }
//   }
// );

// export const setLeaveBalance = createAsyncThunk(
//   "dashboard/setLeaveBalance",
//   async (
//     data: { employeeName: string; totalLeaves: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/leaves/set-balance`,
//         data,
//         getAuthConfig()
//       );
//       return {
//         employeeName: data.employeeName,
//         balance: response.data.data.balance || response.data.data,
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to set leave balance"
//       );
//     }
//   }
// );

// export const fetchLeaveBalance = createAsyncThunk(
//   "dashboard/fetchLeaveBalance",
//   async (employeeName: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/leaves/balance?employeeName=${encodeURIComponent(employeeName)}`,
//         getAuthConfig()
//       );
//       return {
//         employeeName,
//         balance: response.data.data.balance || response.data.data,
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch leave balance"
//       );
//     }
//   }
// );

// // ============================================
// // ASYNC THUNKS - STATISTICS & OVERVIEW
// // ============================================

// export const fetchDashboardStats = createAsyncThunk(
//   "dashboard/fetchStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/dashboard-stats`,
//         getAuthConfig()
//       );
//       return response.data.data.stats || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch dashboard stats"
//       );
//     }
//   }
// );

// export const fetchWeeklyAttendance = createAsyncThunk(
//   "dashboard/fetchWeeklyAttendance",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/weekly-data`,
//         getAuthConfig()
//       );
//       return (
//         response.data.data.weekData ||
//         response.data.data.trend ||
//         response.data.data
//       );
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch weekly attendance"
//       );
//     }
//   }
// );

// export const fetchDepartmentBreakdown = createAsyncThunk(
//   "dashboard/fetchDepartmentBreakdown",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/department-breakdown`,
//         getAuthConfig()
//       );
//       return (
//         response.data.data.productivityData ||
//         response.data.data.departments ||
//         response.data.data
//       );
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch department breakdown"
//       );
//     }
//   }
// );

// export const fetchLeaveStatistics = createAsyncThunk(
//   "dashboard/fetchLeaveStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/leaves/statistics`,
//         getAuthConfig()
//       );
//       return response.data.data.statistics || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch leave statistics"
//       );
//     }
//   }
// );

// export const fetchRecentActivities = createAsyncThunk(
//   "dashboard/fetchActivities",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/recent-activities`,
//         getAuthConfig()
//       );
//       return response.data.data.activities || response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch activities"
//       );
//     }
//   }
// );

// export const calculateWorkHours = createAsyncThunk(
//   "dashboard/calculateWorkHours",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/attendance/work-hours-summary`,
//         getAuthConfig()
//       );
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to calculate work hours"
//       );
//     }
//   }
// );

// // ============================================
// // INITIAL STATE
// // ============================================

// const initialState: DashboardState = {
//   employees: [],
//   attendanceRecords: [],
//   leaveRequests: [],
//   statsData: {
//     totalEmployees: 0,
//     presentToday: 0,
//     absentees: 0,
//     presentPercentage: 0,
//   },
//   weeklyAttendance: [],
//   productivityData: [],
//   leaveChartData: [],
//   activities: [],
//   workHoursSummary: {
//     average: "0h 0m",
//     total: 0,
//   },
//   leaveBalances: {},
//   pendingLeaveCount: 0,
//   checkInStatus: {
//     isCheckedIn: false,
//     hasMarkedToday: false,
//     checkInTime: null,
//   },
//   loading: false,
//   statsLoading: false,
//   attendanceLoading: false,
//   leaveLoading: false,
//   error: null,
// };

// // ============================================
// // SLICE
// // ============================================

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     resetDashboard: () => initialState,
//     resetDashboardState: (state) => {
//       state.employees = [];
//       state.attendanceRecords = [];
//       state.leaveRequests = [];
//       state.statsData = {
//         totalEmployees: 0,
//         presentToday: 0,
//         absentees: 0,
//         presentPercentage: 0,
//       };
//       state.weeklyAttendance = [];
//       state.productivityData = [];
//       state.leaveChartData = [];
//       state.activities = [];
//       state.workHoursSummary = { average: "0h 0m", total: 0 };
//       state.checkInStatus = {
//         isCheckedIn: false,
//         hasMarkedToday: false,
//         checkInTime: null,
//       };
//       state.pendingLeaveCount = 0;
//       state.loading = false;
//       state.error = null;
//     },
//     updatePendingLeaveCount: (state) => {
//       state.pendingLeaveCount = state.leaveRequests.filter(
//         (leave) => leave.status === "Pending" && !leave.isCompanyWide
//       ).length;
//     },
//   },
//   extraReducers: (builder) => {
//     // ============================================
//     // EMPLOYEES
//     // ============================================
//     builder
//       .addCase(fetchAllEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload;
//       })
//       .addCase(fetchAllEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // ============================================
//     // ATTENDANCE - CHECK IN/OUT
//     // ============================================
//     builder
//       .addCase(checkIn.pending, (state) => {
//         state.attendanceLoading = true;
//         state.error = null;
//       })
//       .addCase(checkIn.fulfilled, (state, action) => {
//         state.attendanceLoading = false;
//         state.checkInStatus = {
//           isCheckedIn: true,
//           hasMarkedToday: true,
//           checkInTime: action.payload.checkIn,
//           attendance: action.payload,
//         };
//         // Add to attendance records if not already there
//         const exists = state.attendanceRecords.some(
//           (record) => record._id === action.payload._id
//         );
//         if (!exists) {
//           state.attendanceRecords.unshift(action.payload);
//         }
//       })
//       .addCase(checkIn.rejected, (state, action) => {
//         state.attendanceLoading = false;
//         state.error = action.payload as string;
//       });

//     builder
//       .addCase(checkOut.pending, (state) => {
//         state.attendanceLoading = true;
//         state.error = null;
//       })
//       .addCase(checkOut.fulfilled, (state, action) => {
//         state.attendanceLoading = false;
//         state.checkInStatus = {
//           isCheckedIn: false,
//           hasMarkedToday: true,
//           checkInTime: null,
//           checkOutTime: action.payload.checkOut,
//           workDuration: action.payload.workDuration,
//         };
//         // Update attendance record
//         const index = state.attendanceRecords.findIndex(
//           (record) => record._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.attendanceRecords[index] = action.payload;
//         }
//       })
//       .addCase(checkOut.rejected, (state, action) => {
//         state.attendanceLoading = false;
//         state.error = action.payload as string;
//       });

//     builder
//       .addCase(fetchCheckInStatus.pending, (state) => {
//         state.attendanceLoading = true;
//       })
//       .addCase(fetchCheckInStatus.fulfilled, (state, action) => {
//         state.attendanceLoading = false;
//         state.checkInStatus = action.payload;
//       })
//       .addCase(fetchCheckInStatus.rejected, (state, action) => {
//         state.attendanceLoading = false;
//         state.error = action.payload as string;
//       });

//     // ============================================
//     // ATTENDANCE - RECORDS
//     // ============================================
//     builder
//       .addCase(fetchAttendanceRecords.pending, (state) => {
//         state.attendanceLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
//         state.attendanceLoading = false;
//         state.attendanceRecords = action.payload;
//       })
//       .addCase(fetchAttendanceRecords.rejected, (state, action) => {
//         state.attendanceLoading = false;
//         state.error = action.payload as string;
//       });

//     builder.addCase(createAttendanceRecord.fulfilled, (state, action) => {
//       state.attendanceRecords.unshift(action.payload);
//     });

//     builder.addCase(updateAttendanceRecord.fulfilled, (state, action) => {
//       const index = state.attendanceRecords.findIndex(
//         (record) => record._id === action.payload._id
//       );
//       if (index !== -1) {
//         state.attendanceRecords[index] = action.payload;
//       }
//     });

//     builder.addCase(deleteAttendanceRecord.fulfilled, (state, action) => {
//       state.attendanceRecords = state.attendanceRecords.filter(
//         (record) => record._id !== action.payload
//       );
//     });

//     // ============================================
//     // LEAVES
//     // ============================================
//     builder
//       .addCase(fetchMyLeaves.pending, (state) => {
//         state.leaveLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyLeaves.fulfilled, (state, action) => {
//         state.leaveLoading = false;
//         state.leaveRequests = action.payload;
//         state.pendingLeaveCount = action.payload.filter(
//           (leave: LeaveRequest) =>
//             leave.status === "Pending" && !leave.isCompanyWide
//         ).length;
//       })
//       .addCase(fetchMyLeaves.rejected, (state, action) => {
//         state.leaveLoading = false;
//         state.error = action.payload as string;
//       });

//     builder
//       .addCase(fetchAllLeaves.pending, (state) => {
//         state.leaveLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllLeaves.fulfilled, (state, action) => {
//         state.leaveLoading = false;
//         state.leaveRequests = action.payload;
//         state.pendingLeaveCount = action.payload.filter(
//           (leave: LeaveRequest) =>
//             leave.status === "Pending" && !leave.isCompanyWide
//         ).length;
//       })
//       .addCase(fetchAllLeaves.rejected, (state, action) => {
//         state.leaveLoading = false;
//         state.error = action.payload as string;
//       });

//     builder.addCase(createLeaveRequest.fulfilled, (state, action) => {
//       state.leaveRequests.unshift(action.payload);
//       if (
//         action.payload.status === "Pending" &&
//         !action.payload.isCompanyWide
//       ) {
//         state.pendingLeaveCount++;
//       }
//     });

//     builder.addCase(grantLeave.fulfilled, (state, action) => {
//       state.leaveRequests.unshift(action.payload);
//     });

//     builder.addCase(grantCompanyLeave.fulfilled, (state, action) => {
//       // Refresh leave requests after company-wide grant
//       state.leaveLoading = false;
//     });

//     builder.addCase(updateLeaveStatus.fulfilled, (state, action) => {
//       const index = state.leaveRequests.findIndex(
//         (leave) => leave._id === action.payload._id
//       );
//       if (index !== -1) {
//         state.leaveRequests[index] = action.payload;
//         // Update pending count
//         state.pendingLeaveCount = state.leaveRequests.filter(
//           (leave) => leave.status === "Pending" && !leave.isCompanyWide
//         ).length;
//       }
//     });

//     builder.addCase(deleteLeaveRequest.fulfilled, (state, action) => {
//       const deletedLeave = state.leaveRequests.find(
//         (leave) => leave._id === action.payload
//       );
//       state.leaveRequests = state.leaveRequests.filter(
//         (leave) => leave._id !== action.payload
//       );
//       // Update pending count if deleted leave was pending
//       if (deletedLeave?.status === "Pending" && !deletedLeave.isCompanyWide) {
//         state.pendingLeaveCount--;
//       }
//     });

//     builder.addCase(setLeaveBalance.fulfilled, (state, action) => {
//       const { employeeName, balance } = action.payload;
//       state.leaveBalances[employeeName] = balance;
//     });

//     builder.addCase(fetchLeaveBalance.fulfilled, (state, action) => {
//       const { employeeName, balance } = action.payload;
//       state.leaveBalances[employeeName] = balance;
//     });

//     // ============================================
//     // STATISTICS & OVERVIEW
//     // ============================================
//     builder
//       .addCase(fetchDashboardStats.pending, (state) => {
//         state.statsLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDashboardStats.fulfilled, (state, action) => {
//         state.statsLoading = false;
//         state.statsData = action.payload;
//       })
//       .addCase(fetchDashboardStats.rejected, (state, action) => {
//         state.statsLoading = false;
//         state.error = action.payload as string;
//       });

//     builder.addCase(fetchWeeklyAttendance.fulfilled, (state, action) => {
//       state.weeklyAttendance = action.payload;
//     });

//     builder.addCase(fetchDepartmentBreakdown.fulfilled, (state, action) => {
//       const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];
//       const data = action.payload;

//       if (Array.isArray(data)) {
//         state.productivityData = data.map((item: any, index: number) => ({
//           name: item.name || item.department || item.specificRole || "Unknown",
//           value: item.value || item.total || item.count || 0,
//           color: item.color || colors[index % colors.length],
//         }));
//       } else {
//         state.productivityData = [];
//       }
//     });

//     builder
//       .addCase(fetchLeaveStatistics.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLeaveStatistics.fulfilled, (state, action) => {
//         state.loading = false;
//         const stats = action.payload;
//         state.leaveChartData = [
//           { name: "Approved", value: stats.approved || 0, color: "#00D4B1" },
//           { name: "Pending", value: stats.pending || 0, color: "#FFB020" },
//           { name: "Rejected", value: stats.rejected || 0, color: "#FF4D4F" },
//         ];
//       })
//       .addCase(fetchLeaveStatistics.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     builder
//       .addCase(fetchRecentActivities.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRecentActivities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.activities = action.payload;
//       })
//       .addCase(fetchRecentActivities.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     builder.addCase(calculateWorkHours.fulfilled, (state, action) => {
//       state.workHoursSummary = action.payload;
//     });

//     builder
//       .addCase(searchEmployees.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(searchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employees = action.payload;
//       })
//       .addCase(searchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // ============================================
// // ACTIONS & SELECTORS
// // ============================================
// export const {
//   clearError,
//   resetDashboard,
//   updatePendingLeaveCount,
//   resetDashboardState,
// } = dashboardSlice.actions;

// export default dashboardSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flextrack-be-production.up.railway.app/api";

// ============================================
// TYPES
// ============================================

interface Employee {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  specificRole: string;
  shift?: string;
  weeklyHours?: number;
  payAmount?: number;
}

interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    email: string;
    specificRole: string;
    shift?: string;
  };
  date: string;
  checkIn: string;
  checkOut?: string;
  workingTime?: string;
  status: "Present" | "Absent" | "Late" | "Half-Day";
  workingHours?: number;
  notes?: string;
}

interface LeaveRequest {
  _id: string;
  employeeId?: {
    _id: string;
    name: string;
    email: string;
  };
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays?: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  isCompanyWide?: boolean;
  holidayTitle?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  adminNotes?: string;
  reviewedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  reviewedAt?: string;
  createdAt: string;
}

interface StatsData {
  totalEmployees: number;
  presentToday: number;
  absentees: number;
  presentPercentage?: number;
}

interface WeeklyAttendanceData {
  day: string;
  present: number;
  absent: number;
  late?: number;
  date?: string;
}

interface ProductivityData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface LeaveChartData {
  name: string;
  value: number;
  color: string;
}

interface Activity {
  id: string;
  employee: string;
  action: string;
  time: string;
  timestamp: number;
  type: "checkin" | "checkout" | "leave" | "admin";
}

interface LeaveBalance {
  employeeEmail: string;
  employeeName: string;
  totalLeaves: number;
  usedLeaves: number;
  remainingLeaves: number;
  year: number;
}

interface CheckInStatus {
  isCheckedIn: boolean;
  hasMarkedToday: boolean;
  checkInTime: string | null;
  checkOutTime?: string | null;
  workDuration?: string;
  attendance?: AttendanceRecord;
}

interface Notification {
  _id: string;
  recipientEmail: string;
  type: "leave_status" | "company_announcement" | "company_leave";
  title: string;
  message: string;
  read: boolean;
  leaveId?: string;
  announcementId?: string;
  createdAt: string;
}

interface Announcement {
  _id: string;
  companyEmail: string;
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  isActive: boolean;
  expiresAt?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface DashboardState {
  // Core Data
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];

  // Stats & Analytics
  statsData: StatsData;
  weeklyAttendance: WeeklyAttendanceData[];
  productivityData: ProductivityData[];
  leaveChartData: LeaveChartData[];
  activities: Activity[];
  workHoursSummary: {
    average: string;
    total: number;
  };

  // Leave Management
  leaveBalances: Record<string, LeaveBalance>;
  pendingLeaveCount: number;

  // Check-in Status
  checkInStatus: CheckInStatus;

  // Notifications & Announcements
  notifications: Notification[];
  unreadNotificationCount: number;
  announcements: Announcement[];
  notificationsLoading: boolean;
  announcementsLoading: boolean;

  // UI States
  loading: boolean;
  statsLoading: boolean;
  attendanceLoading: boolean;
  leaveLoading: boolean;
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
// ASYNC THUNKS - NOTIFICATIONS
// ============================================

export const fetchNotifications = createAsyncThunk(
  "dashboard/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications`,
        getAuthConfig()
      );
      return response.data.data.notifications || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);
export const fetchRecentNotifications = createAsyncThunk(
  "dashboard/fetchRecentNotifications",
  async (_, { rejectWithValue }) => {
    try {
      // CHECK IF ALERTS ARE ENABLED
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        // If alerts are disabled, return empty data
        if (user.alerts === false) {
          return {
            notifications: [],
            unreadCount: 0,
          };
        }
      }

      const response = await axios.get(
        `${API_URL}/notifications/recent`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent notifications"
      );
    }
  }
);
// export const fetchRecentNotifications = createAsyncThunk(
//   "dashboard/fetchRecentNotifications",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/notifications/recent`,
//         getAuthConfig()
//       );
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch recent notifications"
//       );
//     }
//   }
// );

export const fetchUnreadCount = createAsyncThunk(
  "dashboard/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/unread-count`,
        getAuthConfig()
      );
      return response.data.data.unreadCount || response.data.data.count || 0;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch unread count"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "dashboard/markNotificationAsRead",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        getAuthConfig()
      );
      return response.data.data.notification || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notification as read"
      );
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "dashboard/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/notifications/mark-all-read`,
        {},
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to mark all notifications as read"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "dashboard/deleteNotification",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/notifications/${notificationId}`,
        getAuthConfig()
      );
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete notification"
      );
    }
  }
);

// ============================================
// ASYNC THUNKS - ANNOUNCEMENTS
// ============================================

export const fetchAnnouncements = createAsyncThunk(
  "dashboard/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/announcements`,
        getAuthConfig()
      );
      return response.data.data.announcements || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch announcements"
      );
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "dashboard/createAnnouncement",
  async (
    data: {
      title: string;
      message: string;
      priority: "low" | "medium" | "high";
      expiresAt?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/announcements/create`,
        data,
        getAuthConfig()
      );
      return response.data.data.announcement || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create announcement"
      );
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "dashboard/deleteAnnouncement",
  async (announcementId: string, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/announcements/${announcementId}`,
        getAuthConfig()
      );
      return announcementId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete announcement"
      );
    }
  }
);

// ============================================
// ASYNC THUNKS - EMPLOYEES
// ============================================

export const fetchAllEmployees = createAsyncThunk(
  "dashboard/fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/employees/list`,
        getAuthConfig()
      );
      return response.data.data.employees || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);

export const searchEmployees = createAsyncThunk(
  "dashboard/searchEmployees",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/employees/search?query=${query}`,
        getAuthConfig()
      );
      return response.data.data.employees || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search employees"
      );
    }
  }
);

// ============================================
// ASYNC THUNKS - ATTENDANCE
// ============================================

export const checkIn = createAsyncThunk(
  "dashboard/checkIn",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/attendance/check-in`,
        {},
        getAuthConfig()
      );
      return response.data.data.attendance || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check in"
      );
    }
  }
);

export const checkOut = createAsyncThunk(
  "dashboard/checkOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance/check-out`,
        {},
        getAuthConfig()
      );
      return response.data.data.attendance || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check out"
      );
    }
  }
);

export const fetchCheckInStatus = createAsyncThunk(
  "dashboard/fetchCheckInStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/check-in-status`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch check-in status"
      );
    }
  }
);

export const fetchAttendanceRecords = createAsyncThunk(
  "dashboard/fetchAttendanceRecords",
  async (
    params: { startDate?: string; endDate?: string; status?: string } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.status) queryParams.append("status", params.status);

      const response = await axios.get(
        `${API_URL}/attendance/list?${queryParams.toString()}`,
        getAuthConfig()
      );
      return response.data.data.attendance || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance records"
      );
    }
  }
);

export const createAttendanceRecord = createAsyncThunk(
  "dashboard/createAttendanceRecord",
  async (
    data: {
      employeeId: string;
      date: string;
      checkIn: string;
      checkOut?: string;
      status: string;
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
      return response.data.data.attendance || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create attendance record"
      );
    }
  }
);

export const updateAttendanceRecord = createAsyncThunk(
  "dashboard/updateAttendanceRecord",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance/${id}`,
        data,
        getAuthConfig()
      );
      return response.data.data.attendance || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update attendance record"
      );
    }
  }
);

export const deleteAttendanceRecord = createAsyncThunk(
  "dashboard/deleteAttendanceRecord",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/attendance/${id}`, getAuthConfig());
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete attendance record"
      );
    }
  }
);

// ============================================
// ASYNC THUNKS - LEAVES
// ============================================

export const fetchMyLeaves = createAsyncThunk(
  "dashboard/fetchMyLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/leaves/list`,
        getAuthConfig()
      );
      return response.data.data.leaves || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leaves"
      );
    }
  }
);

export const fetchAllLeaves = createAsyncThunk(
  "dashboard/fetchAllLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/leaves/list`,
        getAuthConfig()
      );
      return response.data.data.leaves || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all leaves"
      );
    }
  }
);

export const createLeaveRequest = createAsyncThunk(
  "dashboard/createLeaveRequest",
  async (
    data: {
      leaveType: string;
      startDate: string;
      endDate: string;
      reason: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/leaves/submit`,
        data,
        getAuthConfig()
      );
      return response.data.data.leave || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create leave request"
      );
    }
  }
);

export const grantLeave = createAsyncThunk(
  "dashboard/grantLeave",
  async (
    data: {
      employeeName: string;
      leaveType: string;
      startDate: string;
      endDate: string;
      reason: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/leaves/grant-leave`,
        data,
        getAuthConfig()
      );
      return response.data.data.leave || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to grant leave"
      );
    }
  }
);

export const grantCompanyLeave = createAsyncThunk(
  "dashboard/grantCompanyLeave",
  async (
    data: {
      holidayTitle: string;
      leaveType: string;
      startDate: string;
      endDate: string;
      reason: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/leaves/grant-company-leave`,
        data,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to grant company leave"
      );
    }
  }
);

export const updateLeaveStatus = createAsyncThunk(
  "dashboard/updateLeaveStatus",
  async (
    {
      id,
      status,
      adminNotes,
    }: { id: string; status: string; adminNotes?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/leaves/${id}/status`,
        { status, adminNotes },
        getAuthConfig()
      );
      return response.data.data.leave || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update leave status"
      );
    }
  }
);

export const deleteLeaveRequest = createAsyncThunk(
  "dashboard/deleteLeaveRequest",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/leaves/${id}`, getAuthConfig());
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete leave request"
      );
    }
  }
);

export const setLeaveBalance = createAsyncThunk(
  "dashboard/setLeaveBalance",
  async (
    data: { employeeName: string; totalLeaves: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/leaves/set-balance`,
        data,
        getAuthConfig()
      );
      return {
        employeeName: data.employeeName,
        balance: response.data.data.balance || response.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set leave balance"
      );
    }
  }
);

export const fetchLeaveBalance = createAsyncThunk(
  "dashboard/fetchLeaveBalance",
  async (employeeName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/leaves/balance?employeeName=${encodeURIComponent(employeeName)}`,
        getAuthConfig()
      );
      return {
        employeeName,
        balance: response.data.data.balance || response.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leave balance"
      );
    }
  }
);

// ============================================
// ASYNC THUNKS - STATISTICS & OVERVIEW
// ============================================

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/dashboard-stats`,
        getAuthConfig()
      );
      return response.data.data.stats || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchWeeklyAttendance = createAsyncThunk(
  "dashboard/fetchWeeklyAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/weekly-data`,
        getAuthConfig()
      );
      return (
        response.data.data.weekData ||
        response.data.data.trend ||
        response.data.data
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weekly attendance"
      );
    }
  }
);

export const fetchDepartmentBreakdown = createAsyncThunk(
  "dashboard/fetchDepartmentBreakdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/department-breakdown`,
        getAuthConfig()
      );
      return (
        response.data.data.productivityData ||
        response.data.data.departments ||
        response.data.data
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch department breakdown"
      );
    }
  }
);

export const fetchLeaveStatistics = createAsyncThunk(
  "dashboard/fetchLeaveStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/leaves/statistics`,
        getAuthConfig()
      );
      return response.data.data.statistics || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leave statistics"
      );
    }
  }
);

export const fetchRecentActivities = createAsyncThunk(
  "dashboard/fetchActivities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/recent-activities`,
        getAuthConfig()
      );
      return response.data.data.activities || response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch activities"
      );
    }
  }
);

export const calculateWorkHours = createAsyncThunk(
  "dashboard/calculateWorkHours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/attendance/work-hours-summary`,
        getAuthConfig()
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to calculate work hours"
      );
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState: DashboardState = {
  employees: [],
  attendanceRecords: [],
  leaveRequests: [],
  statsData: {
    totalEmployees: 0,
    presentToday: 0,
    absentees: 0,
    presentPercentage: 0,
  },
  weeklyAttendance: [],
  productivityData: [],
  leaveChartData: [],
  activities: [],
  workHoursSummary: {
    average: "0h 0m",
    total: 0,
  },
  leaveBalances: {},
  pendingLeaveCount: 0,
  checkInStatus: {
    isCheckedIn: false,
    hasMarkedToday: false,
    checkInTime: null,
  },
  notifications: [],
  unreadNotificationCount: 0,
  announcements: [],
  notificationsLoading: false,
  announcementsLoading: false,
  loading: false,
  statsLoading: false,
  attendanceLoading: false,
  leaveLoading: false,
  error: null,
};

// ============================================
// SLICE
// ============================================

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDashboard: () => initialState,
    resetDashboardState: (state) => {
      state.employees = [];
      state.attendanceRecords = [];
      state.leaveRequests = [];
      state.statsData = {
        totalEmployees: 0,
        presentToday: 0,
        absentees: 0,
        presentPercentage: 0,
      };
      state.weeklyAttendance = [];
      state.productivityData = [];
      state.leaveChartData = [];
      state.activities = [];
      state.workHoursSummary = { average: "0h 0m", total: 0 };
      state.checkInStatus = {
        isCheckedIn: false,
        hasMarkedToday: false,
        checkInTime: null,
      };
      state.pendingLeaveCount = 0;
      state.notifications = [];
      state.unreadNotificationCount = 0;
      state.announcements = [];
      state.loading = false;
      state.error = null;
    },
    updatePendingLeaveCount: (state) => {
      state.pendingLeaveCount = state.leaveRequests.filter(
        (leave) => leave.status === "Pending" && !leave.isCompanyWide
      ).length;
    },
  },
  extraReducers: (builder) => {
    // ============================================
    // NOTIFICATIONS
    // ============================================
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notificationsLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload;
        state.unreadNotificationCount = action.payload.filter(
          (notification: Notification) => !notification.read
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchRecentNotifications.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(fetchRecentNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.notifications || action.payload;
        state.unreadNotificationCount =
          action.payload.unreadCount ||
          state.notifications.filter(
            (notification: Notification) => !notification.read
          ).length;
      })
      .addCase(fetchRecentNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchUnreadCount.fulfilled, (state, action) => {
      state.unreadNotificationCount = action.payload;
    });

    builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
      const index = state.notifications.findIndex(
        (notification) => notification._id === action.payload._id
      );
      if (index !== -1) {
        state.notifications[index] = action.payload;
        if (!action.payload.read) {
          state.unreadNotificationCount = Math.max(
            0,
            state.unreadNotificationCount - 1
          );
        }
      }
    });

    builder.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      state.unreadNotificationCount = 0;
    });

    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      const deletedNotification = state.notifications.find(
        (notification) => notification._id === action.payload
      );
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
      if (deletedNotification && !deletedNotification.read) {
        state.unreadNotificationCount = Math.max(
          0,
          state.unreadNotificationCount - 1
        );
      }
    });

    // ============================================
    // ANNOUNCEMENTS
    // ============================================
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.announcementsLoading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcementsLoading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.announcementsLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(createAnnouncement.fulfilled, (state, action) => {
      state.announcements.unshift(action.payload);
    });

    builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
      state.announcements = state.announcements.filter(
        (announcement) => announcement._id !== action.payload
      );
    });

    // ============================================
    // EMPLOYEES
    // ============================================
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // ATTENDANCE - CHECK IN/OUT
    // ============================================
    builder
      .addCase(checkIn.pending, (state) => {
        state.attendanceLoading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.checkInStatus = {
          isCheckedIn: true,
          hasMarkedToday: true,
          checkInTime: action.payload.checkIn,
          attendance: action.payload,
        };
        // Add to attendance records if not already there
        const exists = state.attendanceRecords.some(
          (record) => record._id === action.payload._id
        );
        if (!exists) {
          state.attendanceRecords.unshift(action.payload);
        }
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.attendanceLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(checkOut.pending, (state) => {
        state.attendanceLoading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.checkInStatus = {
          isCheckedIn: false,
          hasMarkedToday: true,
          checkInTime: null,
          checkOutTime: action.payload.checkOut,
          workDuration: action.payload.workDuration,
        };
        // Update attendance record
        const index = state.attendanceRecords.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.attendanceRecords[index] = action.payload;
        }
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.attendanceLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchCheckInStatus.pending, (state) => {
        state.attendanceLoading = true;
      })
      .addCase(fetchCheckInStatus.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.checkInStatus = action.payload;
      })
      .addCase(fetchCheckInStatus.rejected, (state, action) => {
        state.attendanceLoading = false;
        state.error = action.payload as string;
      });

    // ============================================
    // ATTENDANCE - RECORDS
    // ============================================
    builder
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.attendanceLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceRecords.rejected, (state, action) => {
        state.attendanceLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(createAttendanceRecord.fulfilled, (state, action) => {
      state.attendanceRecords.unshift(action.payload);
    });

    builder.addCase(updateAttendanceRecord.fulfilled, (state, action) => {
      const index = state.attendanceRecords.findIndex(
        (record) => record._id === action.payload._id
      );
      if (index !== -1) {
        state.attendanceRecords[index] = action.payload;
      }
    });

    builder.addCase(deleteAttendanceRecord.fulfilled, (state, action) => {
      state.attendanceRecords = state.attendanceRecords.filter(
        (record) => record._id !== action.payload
      );
    });

    // ============================================
    // LEAVES
    // ============================================
    builder
      .addCase(fetchMyLeaves.pending, (state) => {
        state.leaveLoading = true;
        state.error = null;
      })
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.leaveLoading = false;
        state.leaveRequests = action.payload;
        state.pendingLeaveCount = action.payload.filter(
          (leave: LeaveRequest) =>
            leave.status === "Pending" && !leave.isCompanyWide
        ).length;
      })
      .addCase(fetchMyLeaves.rejected, (state, action) => {
        state.leaveLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAllLeaves.pending, (state) => {
        state.leaveLoading = true;
        state.error = null;
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.leaveLoading = false;
        state.leaveRequests = action.payload;
        state.pendingLeaveCount = action.payload.filter(
          (leave: LeaveRequest) =>
            leave.status === "Pending" && !leave.isCompanyWide
        ).length;
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.leaveLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(createLeaveRequest.fulfilled, (state, action) => {
      state.leaveRequests.unshift(action.payload);
      if (
        action.payload.status === "Pending" &&
        !action.payload.isCompanyWide
      ) {
        state.pendingLeaveCount++;
      }
    });

    builder.addCase(grantLeave.fulfilled, (state, action) => {
      state.leaveRequests.unshift(action.payload);
    });

    builder.addCase(grantCompanyLeave.fulfilled, (state, action) => {
      // Refresh leave requests after company-wide grant
      state.leaveLoading = false;
    });

    builder.addCase(updateLeaveStatus.fulfilled, (state, action) => {
      const index = state.leaveRequests.findIndex(
        (leave) => leave._id === action.payload._id
      );
      if (index !== -1) {
        state.leaveRequests[index] = action.payload;
        // Update pending count
        state.pendingLeaveCount = state.leaveRequests.filter(
          (leave) => leave.status === "Pending" && !leave.isCompanyWide
        ).length;
      }
    });

    builder.addCase(deleteLeaveRequest.fulfilled, (state, action) => {
      const deletedLeave = state.leaveRequests.find(
        (leave) => leave._id === action.payload
      );
      state.leaveRequests = state.leaveRequests.filter(
        (leave) => leave._id !== action.payload
      );
      // Update pending count if deleted leave was pending
      if (deletedLeave?.status === "Pending" && !deletedLeave.isCompanyWide) {
        state.pendingLeaveCount--;
      }
    });

    builder.addCase(setLeaveBalance.fulfilled, (state, action) => {
      const { employeeName, balance } = action.payload;
      state.leaveBalances[employeeName] = balance;
    });

    builder.addCase(fetchLeaveBalance.fulfilled, (state, action) => {
      const { employeeName, balance } = action.payload;
      state.leaveBalances[employeeName] = balance;
    });

    // ============================================
    // STATISTICS & OVERVIEW
    // ============================================
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.statsData = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchWeeklyAttendance.fulfilled, (state, action) => {
      state.weeklyAttendance = action.payload;
    });

    builder.addCase(fetchDepartmentBreakdown.fulfilled, (state, action) => {
      const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];
      const data = action.payload;

      if (Array.isArray(data)) {
        state.productivityData = data.map((item: any, index: number) => ({
          name: item.name || item.department || item.specificRole || "Unknown",
          value: item.value || item.total || item.count || 0,
          color: item.color || colors[index % colors.length],
        }));
      } else {
        state.productivityData = [];
      }
    });

    builder
      .addCase(fetchLeaveStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveStatistics.fulfilled, (state, action) => {
        state.loading = false;
        const stats = action.payload;
        state.leaveChartData = [
          { name: "Approved", value: stats.approved || 0, color: "#00D4B1" },
          { name: "Pending", value: stats.pending || 0, color: "#FFB020" },
          { name: "Rejected", value: stats.rejected || 0, color: "#FF4D4F" },
        ];
      })
      .addCase(fetchLeaveStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchRecentActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(calculateWorkHours.fulfilled, (state, action) => {
      state.workHoursSummary = action.payload;
    });

    builder
      .addCase(searchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ============================================
// ACTIONS & SELECTORS
// ============================================
export const {
  clearError,
  resetDashboard,
  updatePendingLeaveCount,
  resetDashboardState,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
