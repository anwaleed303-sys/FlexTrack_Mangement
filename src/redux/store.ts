import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import overviewReducer from "./slices/overviewSlice";
import shiftsReducer from "./slices/shiftsSlice";
import exportReducer from "./slices/exportSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    overview: overviewReducer,
    shifts: shiftsReducer,
    export: exportReducer,
    // Add other reducers here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
