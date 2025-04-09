import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState:localStorage.getItem("token") || "",
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem("token", action.payload);
            return action.payload;
        },
        removeToken: (state) => {
            localStorage.removeItem("token");
            return "";
        },
    },
    
})
export const { setToken, removeToken } = jwtSlice.actions;
export default jwtSlice.reducer;