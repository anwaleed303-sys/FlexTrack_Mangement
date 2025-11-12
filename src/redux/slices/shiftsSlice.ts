// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import * as shiftService from "../../services/shiftService";

// // // Add these async thunks
// // export const assignShiftAsync = createAsyncThunk(
// //   "shifts/assign",
// //   async (data: any, { rejectWithValue }) => {
// //     try {
// //       const response = await shiftService.assignShift(data);
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const fetchShiftAssignments = createAsyncThunk(
// //   "shifts/fetchAssignments",
// //   async (params: any, { rejectWithValue }) => {
// //     try {
// //       const response = await shiftService.getShiftAssignments(params);
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const createShiftRequestAsync = createAsyncThunk(
// //   "shifts/createRequest",
// //   async (data: any, { rejectWithValue }) => {
// //     try {
// //       const response = await shiftService.createShiftRequest(data);
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const fetchShiftRequests = createAsyncThunk(
// //   "shifts/fetchRequests",
// //   async (status: string, { rejectWithValue }) => {
// //     try {
// //       const response = await shiftService.getShiftRequests(status);
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const reviewShiftRequestAsync = createAsyncThunk(
// //   "shifts/reviewRequest",
// //   async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
// //     try {
// //       const response = await shiftService.reviewShiftRequest(id, data);
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // // Update your slice
// // const shiftsSlice = createSlice({
// //   name: "shifts",
// //   initialState: {
// //     assignments: [],
// //     requests: [],
// //     loading: false,
// //     error: null as string | null,
// //   },
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     // Assign Shift
// //     builder
// //       .addCase(assignShiftAsync.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(assignShiftAsync.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.assignments = action.payload.assignments;
// //       })
// //       .addCase(assignShiftAsync.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });

// //     // Fetch Assignments
// //     builder
// //       .addCase(fetchShiftAssignments.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchShiftAssignments.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.assignments = action.payload.assignments;
// //       })
// //       .addCase(fetchShiftAssignments.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });

// //     // Create Request
// //     builder
// //       .addCase(createShiftRequestAsync.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(createShiftRequestAsync.fulfilled, (state, action) => {
// //         state.loading = false;
// //       })
// //       .addCase(createShiftRequestAsync.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });

// //     // Fetch Requests
// //     builder
// //       .addCase(fetchShiftRequests.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchShiftRequests.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.requests = action.payload.requests;
// //       })
// //       .addCase(fetchShiftRequests.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });

// //     // Review Request
// //     builder
// //       .addCase(reviewShiftRequestAsync.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(reviewShiftRequestAsync.fulfilled, (state, action) => {
// //         state.loading = false;
// //       })
// //       .addCase(reviewShiftRequestAsync.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export default shiftsSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as shiftService from "../../services/shiftService";

// // ✅ ADD PROPER TYPE DEFINITIONS
// interface ShiftAssignment {
//   id?: string;
//   employeeEmail: string;
//   employeeName: string;
//   shift: string;
//   customShift?: string;
//   startDate: string;
//   endDate: string;
//   assignedBy: string;
//   assignedDate: string;
//   closedDays?: string[];
// }

// interface ShiftRequest {
//   id?: string;
//   employeeName: string;
//   employeeEmail: string;
//   profileImage?: string;
//   currentDepartment: string;
//   currentShift: string;
//   currentEmploymentType: string;
//   requestedShift: string;
//   requestedEmploymentType: string;
//   dateRange: [string, string];
//   reason: string;
//   requestDate: string;
//   status: string;
//   closedDays?: string[];
//   decisionTime?: number;
// }

// interface ShiftsState {
//   assignments: ShiftAssignment[];
//   requests: ShiftRequest[];
//   loading: boolean;
//   departments: string[];
//   error: string | null;
// }

// // ✅ ADD INITIAL STATE WITH PROPER TYPES
// const initialState: ShiftsState = {
//   assignments: [],
//   departments: [],
//   requests: [],
//   loading: false,
//   error: null,
// };

// // Add these async thunks
// export const assignShiftAsync = createAsyncThunk(
//   "shifts/assign",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.assignShift(data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to assign shift");
//     }
//   }
// );
// export const fetchDepartments = createAsyncThunk(
//   "shifts/fetchDepartments",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.getDepartments();
//       return response.data.departments; // ← Returns the departments array
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to fetch departments");
//     }
//   }
// );

// export const fetchShiftAssignments = createAsyncThunk(
//   "shifts/fetchAssignments",
//   async (params: any, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.getShiftAssignments(params);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to fetch assignments");
//     }
//   }
// );

// export const createShiftRequestAsync = createAsyncThunk(
//   "shifts/createRequest",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.createShiftRequest(data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to create request");
//     }
//   }
// );

// export const fetchShiftRequests = createAsyncThunk(
//   "shifts/fetchRequests",
//   async (status: string, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.getShiftRequests(status);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to fetch requests");
//     }
//   }
// );

// export const reviewShiftRequestAsync = createAsyncThunk(
//   "shifts/reviewRequest",
//   async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
//     try {
//       const response = await shiftService.reviewShiftRequest(id, data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "Failed to review request");
//     }
//   }
// );

// // Update your slice
// const shiftsSlice = createSlice({
//   name: "shifts",
//   initialState,
//   reducers: {
//     // ✅ ADD RESET ACTION IF NEEDED
//     resetShiftsState: (state) => {
//       state.assignments = [];
//       state.requests = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Assign Shift
//     builder
//       .addCase(assignShiftAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(assignShiftAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ PROPERLY TYPE THE RESPONSE
//         if (action.payload.assignments) {
//           state.assignments = action.payload.assignments;
//         }
//       })
//       .addCase(assignShiftAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//     builder
//       .addCase(fetchDepartments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDepartments.fulfilled, (state, action) => {
//         state.loading = false;
//         state.departments = action.payload;
//       })
//       .addCase(fetchDepartments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Fetch Assignments
//     builder
//       .addCase(fetchShiftAssignments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchShiftAssignments.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ PROPERLY TYPE THE RESPONSE
//         if (action.payload.assignments) {
//           state.assignments = action.payload.assignments;
//         }
//       })
//       .addCase(fetchShiftAssignments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Create Request
//     builder
//       .addCase(createShiftRequestAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createShiftRequestAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ ADD NEW REQUEST TO STATE IF RETURNED
//         if (action.payload.request) {
//           state.requests.push(action.payload.request);
//         }
//       })
//       .addCase(createShiftRequestAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Fetch Requests
//     builder
//       .addCase(fetchShiftRequests.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchShiftRequests.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ PROPERLY TYPE THE RESPONSE
//         if (action.payload.requests) {
//           state.requests = action.payload.requests;
//         }
//       })
//       .addCase(fetchShiftRequests.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Review Request
//     builder
//       .addCase(reviewShiftRequestAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(reviewShiftRequestAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         // ✅ UPDATE THE REQUEST IN STATE
//         if (action.payload.request) {
//           const index = state.requests.findIndex(
//             (req) => req.id === action.payload.request.id
//           );
//           if (index !== -1) {
//             state.requests[index] = action.payload.request;
//           }
//         }
//       })
//       .addCase(reviewShiftRequestAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetShiftsState } = shiftsSlice.actions;
// export default shiftsSlice.reducer;

// // ✅ EXPORT TYPES FOR USE IN COMPONENTS
// export type { ShiftAssignment, ShiftRequest, ShiftsState };

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as shiftService from "../../services/shiftService";

// ✅ ADD PROPER TYPE DEFINITIONS
interface ShiftAssignment {
  id?: string;
  employeeEmail: string;
  employeeName: string;
  shift: string;
  customShift?: string;
  startDate: string;
  endDate: string;
  assignedBy: string;
  assignedDate: string;
  closedDays?: string[];
}

interface ShiftRequest {
  id?: string;
  _id: string;
  employeeName: string;
  employeeEmail: string;
  profileImage?: string;
  currentDepartment: string;
  currentShift: string;
  currentEmploymentType: string;
  requestedShift: string;
  requestedEmploymentType: string;
  dateRange: [string, string];
  reason: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  closedDays?: string[];
  decisionTime?: number;
}

// ✅ ADD EMPLOYEE INTERFACE
interface Employee {
  _id?: string;
  name: string;
  email: string;
  specificRole: string;
  shift: string;
  customShift?: string;
  employmentType: string;
  weeklyHours: number;
  profileImage?: string;
}

interface ShiftsState {
  assignments: ShiftAssignment[];
  requests: ShiftRequest[];
  loading: boolean;
  departments: string[];
  employees: Employee[]; // ✅ ADD THIS
  error: string | null;
}

// ✅ ADD INITIAL STATE WITH PROPER TYPES
const initialState: ShiftsState = {
  assignments: [],
  departments: [],
  requests: [],
  employees: [], // ✅ ADD THIS
  loading: false,
  error: null,
};

// Add these async thunks
export const assignShiftAsync = createAsyncThunk(
  "shifts/assign",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await shiftService.assignShift(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to assign shift");
    }
  }
);

export const fetchDepartments = createAsyncThunk(
  "shifts/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await shiftService.getDepartments();
      return response.data.departments;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch departments");
    }
  }
);

export const fetchShiftAssignments = createAsyncThunk(
  "shifts/fetchAssignments",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await shiftService.getShiftAssignments(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch assignments");
    }
  }
);

export const createShiftRequestAsync = createAsyncThunk(
  "shifts/createRequest",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await shiftService.createShiftRequest(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create request");
    }
  }
);

export const fetchShiftRequests = createAsyncThunk(
  "shifts/fetchRequests",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await shiftService.getShiftRequests(status);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch requests");
    }
  }
);

export const reviewShiftRequestAsync = createAsyncThunk(
  "shifts/reviewRequest",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await shiftService.reviewShiftRequest(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to review request");
    }
  }
);

// ✅ ADD THIS NEW ASYNC THUNK
export const fetchEmployeesAsync = createAsyncThunk(
  "shifts/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await shiftService.getEmployees();
      return response.data.employees;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch employees");
    }
  }
);

// Update your slice
const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    resetShiftsState: (state) => {
      state.assignments = [];
      state.requests = [];
      state.employees = []; // ✅ ADD THIS
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Assign Shift
    builder
      .addCase(assignShiftAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignShiftAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.assignments) {
          state.assignments = action.payload.assignments;
        }
      })
      .addCase(assignShiftAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Departments
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Assignments
    builder
      .addCase(fetchShiftAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShiftAssignments.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.assignments) {
          state.assignments = action.payload.assignments;
        }
      })
      .addCase(fetchShiftAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Request
    builder
      .addCase(createShiftRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShiftRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.request) {
          state.requests.push(action.payload.request);
        }
      })
      .addCase(createShiftRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Requests
    builder
      .addCase(fetchShiftRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShiftRequests.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.requests) {
          state.requests = action.payload.requests;
        }
      })
      .addCase(fetchShiftRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Review Request
    builder
      .addCase(reviewShiftRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewShiftRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.request) {
          const index = state.requests.findIndex(
            (req) => req.id === action.payload.request.id
          );
          if (index !== -1) {
            state.requests[index] = action.payload.request;
          }
        }
      })
      .addCase(reviewShiftRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ ADD FETCH EMPLOYEES CASES
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetShiftsState } = shiftsSlice.actions;
export default shiftsSlice.reducer;

// ✅ EXPORT TYPES FOR USE IN COMPONENTS
export type { ShiftAssignment, ShiftRequest, ShiftsState, Employee };
