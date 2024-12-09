import { createSlice,PayloadAction } from "@reduxjs/toolkit";
type AuthModelState = {
  openModel: boolean;
  openModelMenu: boolean;
  modalType: string;
  isLogin: boolean;
  userLogin: string | null;
  signUp: boolean;
};

const initialState: AuthModelState = {
  openModel: false,
  modalType:'',
  openModelMenu: false,
  isLogin: true,
  userLogin: null,
  signUp: false,
};

const modalSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    openModel: (state: AuthModelState, action:PayloadAction<string>) => {
      state.modalType = action.payload;
      state.openModel = true;
    },

    closeModel: (state: AuthModelState) => {
      state.openModel = false;
      state.modalType = ''
    },

    openModelMenu: (state: AuthModelState) => {
      state.openModelMenu = true;
    },

    closeModelMenu: (state: AuthModelState) => {
      state.openModelMenu = false;
    },

    setIsLoginToTrue: (state: AuthModelState) => {
      state.isLogin = true;
    },
    SetToken: (state: AuthModelState, action: any) => {
      state.userLogin = action.payload;
    },
    setIsLoginToFalse: (state: AuthModelState) => {
      state.isLogin = false;
    },

    setSignupTofalse: (state: AuthModelState) => {
      state.signUp = false;
    },

    setSignupTotrue: (state: AuthModelState) => {
      state.signUp = true;
    },
  },
});

export const modelActions = modalSlice.actions;
export default modalSlice.reducer;
