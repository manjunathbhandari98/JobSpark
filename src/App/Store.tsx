import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import profileReducer from "../Slices/ProfileSlice";
import jobReducer from "../Slices/JobSlice";
import jwtReducer from "../Slices/JWTSlice";
import themeReducer from "../Slices/ThemeSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    job: jobReducer,
    jwt: jwtReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<
  typeof Store.getState
>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
