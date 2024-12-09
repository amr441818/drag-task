import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import favReducer from "./modelSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import projectsSlice from "./projectsSlice";
import modelSlice from "./modelSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    Model: modelSlice,
    projects: projectsSlice,
    fav: favReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
