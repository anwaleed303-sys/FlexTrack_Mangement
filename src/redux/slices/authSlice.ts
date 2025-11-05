// // src/redux/slices/authSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { authAPI } from "../../services/api";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   userRole: string;
//   specificRole: string;
//   profileImage?: string;
//   companyName?: string;
//   companyEmail?: string;
//   companyAddress?: string;
//   timezone?: string;
//   isMainAdmin?: boolean;
//   isActive: boolean;
//   lastLogin?: Date;
//   createdAt: Date;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   userType: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   userType: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Async Thunks
// export const registerAdmin = createAsyncThunk(
//   "auth/registerAdmin",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.registerAdmin(data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// export const registerEmployee = createAsyncThunk(
//   "auth/registerEmployee",
//   async (data: any, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.registerEmployee(data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (
//     { email, password }: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await authAPI.login(email, password);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const getCurrentUser = createAsyncThunk(
//   "auth/getMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.getMe();
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to get user"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.userType = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("loggedInUser");
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setCredentials: (
//       state,
//       action: PayloadAction<{ user: User; token: string; userType: string }>
//     ) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.userType = action.payload.userType;
//       state.isAuthenticated = true;
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem(
//         "loggedInUser",
//         JSON.stringify({
//           ...action.payload.user,
//           userType: action.payload.userType,
//         })
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     // Register Admin
//     builder
//       .addCase(registerAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.userType = "admin";
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem(
//           "loggedInUser",
//           JSON.stringify({ ...action.payload.user, userType: "admin" })
//         );
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Register Employee
//     builder
//       .addCase(registerEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.userType = "employee";
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem(
//           "loggedInUser",
//           JSON.stringify({ ...action.payload.user, userType: "employee" })
//         );
//       })
//       .addCase(registerEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Login
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.userType = action.payload.userType;
//         state.isAuthenticated = true;
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem(
//           "loggedInUser",
//           JSON.stringify({
//             ...action.payload.user,
//             userType: action.payload.userType,
//           })
//         );
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });

//     // Get Current User
//     builder
//       .addCase(getCurrentUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//       })
//       .addCase(getCurrentUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { logout, clearError, setCredentials } = authSlice.actions;

// // Explicitly re-export async thunks

// export default authSlice.reducer;

// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  userRole: string;
  specificRole: string;
  profileImage?: string;
  companyName?: string;
  companyEmail?: string;
  companyAddress?: string;
  timezone?: string;
  isMainAdmin?: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  token: string | null;
  userType: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  userType: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async Thunks
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("🔵 Calling registerAdmin...");
      const response = await authAPI.registerAdmin(data);
      console.log("✅ registerAdmin response:", response);
      return response;
    } catch (error: any) {
      console.error("❌ registerAdmin error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const registerEmployee = createAsyncThunk(
  "auth/registerEmployee",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("🔵 Calling registerEmployee...");
      const response = await authAPI.registerEmployee(data);
      console.log("✅ registerEmployee response:", response);
      return response;
    } catch (error: any) {
      console.error("❌ registerEmployee error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("🔵 Calling loginUser...", email);
      const response = await authAPI.login(email, password);
      console.log("✅ loginUser full response:", response);
      console.log("✅ loginUser response.data:", response.data);

      // Return the data correctly based on your API structure
      return response.data || response;
    } catch (error: any) {
      console.error("❌ loginUser full error:", error);
      console.error("❌ loginUser error.response:", error.response);

      // Extract error message properly
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";

      console.error("❌ Returning error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔵 Calling getCurrentUser...");
      const response = await authAPI.getMe();
      console.log("✅ getCurrentUser response:", response);
      return response;
    } catch (error: any) {
      console.error("❌ getCurrentUser error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; userType: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            ...action.payload.user,
            userType: action.payload.userType,
          })
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Register Admin
    builder
      .addCase(registerAdmin.pending, (state) => {
        console.log("⏳ registerAdmin pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        console.log("✅ registerAdmin fulfilled:", action.payload);
        state.loading = false;
        // Check if response has nested data or direct fields
        const responseData = action.payload.data || action.payload;
        state.user = responseData.user;
        state.token = responseData.token;
        state.userType = "admin";
        state.isAuthenticated = true;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", responseData.token);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ ...responseData.user, userType: "admin" })
          );
        }
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        console.error("❌ registerAdmin rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register Employee
    builder
      .addCase(registerEmployee.pending, (state) => {
        console.log("⏳ registerEmployee pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state, action) => {
        console.log("✅ registerEmployee fulfilled:", action.payload);
        state.loading = false;
        const responseData = action.payload.data || action.payload;
        state.user = responseData.user;
        state.token = responseData.token;
        state.userType = "employee";
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", responseData.token);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ ...responseData.user, userType: "employee" })
          );
        }
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        console.error("❌ registerEmployee rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("⏳ login pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("✅ login fulfilled:", action.payload);
        state.loading = false;
        // Check if response has nested data or direct fields
        const responseData = action.payload.data || action.payload;
        state.user = responseData.user;
        state.token = responseData.token;
        state.userType = responseData.userType;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", responseData.token);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              ...responseData.user,
              userType: responseData.userType,
            })
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("❌ login rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        console.log("⏳ getCurrentUser pending");
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log("✅ getCurrentUser fulfilled:", action.payload);
        state.loading = false;
        const responseData = action.payload.data || action.payload;
        state.user = responseData.user;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.error("❌ getCurrentUser rejected:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setCredentials } = authSlice.actions;

export default authSlice.reducer;
