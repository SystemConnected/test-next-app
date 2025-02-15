import { deleteCookie, getCookie, setCookie } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null;
}
// Initial state without accessing localStorage during SSR
const initialState: AuthState = {
  token: typeof window !== "undefined" ? getCookie("token") || null : null,
  user: typeof window !== "undefined" ? getCookie("user") || null : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Store in localStorage
      if (typeof window !== "undefined") {
        // Store in localStorage
        setCookie("token", action.payload.token, 1);
        setCookie("user", JSON.stringify(action.payload.user), 1);
      }
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      // Remove from localStorage
      deleteCookie("token");  
      deleteCookie("user");
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
