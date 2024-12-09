import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  authData: {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    qr_image: string;
    qr_link: string;
    created_at: string;
    updated_at: string;
    is_verified: boolean | null;
  };
  token: string | null;

};
const initialState: AuthState = {
  authData: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    qr_image: "",
    qr_link: "",
    created_at: "",
    updated_at: "",
    is_verified: null,
  },
  token: null,

};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      // Optionally persist token to localStorage here
      localStorage.setItem('token', action.payload);
    },
    clearToken(state) {
      state.token = null;
      // Optionally clear token from localStorage here
      localStorage.removeItem('token');
    },
    addLoginData(state: AuthState, action: PayloadAction<any>) {

      localStorage.setItem(
        "token",
        JSON.stringify(action?.payload?.data?.data[0]?.token)
      );

      state.authData = action?.payload?.data?.data[0]?.user;
    },
    addSignupData(state: AuthState, action: PayloadAction<any>) {

      localStorage.setItem(
        "token",
        JSON.stringify(action?.payload?.data?.data?.token)
      );

      state.authData = action?.payload?.data?.data?.user;
    },

    logout(state) {
      localStorage.clear();
      state.authData = {
        id: 0,
        name: "",
        email: "",
        phone: "",
        qr_image: "",
        qr_link: "",
        created_at: "",
        updated_at: "",
        is_verified: null,
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
