import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

interface UserData {
  _id: string;
  name: string;
  email: string;
  userRole: string;
  specificRole?: string;
  profileImage?: string;
  companyName?: string;
  companyEmail?: string;
  companyAddress?: string;
  timezone?: string;
  employmentType?: string;
  shift?: string;
  weeklyHours?: number;
  payType?: string;
  currency?: string;
  payAmount?: number;
  emailNotifications?: boolean;
  demoNotifications?: boolean;
  smsNotifications?: boolean;
  alerts?: boolean;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  demoNotifications: boolean;
  smsNotifications: boolean;
  alerts: boolean;
}

interface SettingsState {
  user: UserData | null;
  notificationPrefs: NotificationPreferences;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  user: null,
  notificationPrefs: {
    emailNotifications: true,
    demoNotifications: true,
    smsNotifications: true,
    alerts: true,
  },
  loading: false,
  error: null,
};

// Helper to get token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Async Thunks

// Get Profile
export const getProfile = createAsyncThunk(
  "settings/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/settings/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Update Profile Image
export const updateProfileImage = createAsyncThunk(
  "settings/updateProfileImage",
  async (profileImage: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/settings/profile-image`,
        { profileImage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile image"
      );
    }
  }
);

// Update Company Information
export const updateCompanyInfo = createAsyncThunk(
  "settings/updateCompanyInfo",
  async (
    companyData: {
      companyName: string;
      companyEmail: string;
      companyAddress: string;
      timezone: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/settings/company`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update company information"
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "settings/changePassword",
  async (
    passwordData: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/settings/password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
);

// Get Notification Preferences
export const getNotificationPreferences = createAsyncThunk(
  "settings/getNotificationPreferences",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/settings/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch notification preferences"
      );
    }
  }
);

// Update Notification Preferences
export const updateNotificationPreferences = createAsyncThunk(
  "settings/updateNotificationPreferences",
  async (preferences: NotificationPreferences, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/settings/notifications`,
        preferences,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.preferences;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update notification preferences"
      );
    }
  }
);

// Get Employment Details (Employee only)
export const getEmploymentDetails = createAsyncThunk(
  "settings/getEmploymentDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/settings/employment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.employmentDetails;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employment details"
      );
    }
  }
);

// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLocalNotificationPrefs: (
      state,
      action: PayloadAction<NotificationPreferences>
    ) => {
      state.notificationPrefs = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Profile Image
    builder
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.profileImage = action.payload.user.profileImage;
        }
        // Success message will be handled in component
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Company Info
    builder
      .addCase(updateCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload.user };
        }
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Notification Preferences
    builder
      .addCase(getNotificationPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationPrefs = action.payload;
      })
      .addCase(getNotificationPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Notification Preferences
    builder
      .addCase(updateNotificationPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationPrefs = action.payload;
      })
      .addCase(updateNotificationPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Employment Details
    builder
      .addCase(getEmploymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmploymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(getEmploymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateLocalNotificationPrefs } =
  settingsSlice.actions;
export default settingsSlice.reducer;
