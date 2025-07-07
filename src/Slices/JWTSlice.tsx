import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState:localStorage.getItem("token") || "",
    reducers: {
        setToken: (_, action) => {
            localStorage.setItem("token", action.payload);
            return action.payload;
        },
        removeToken: () => {
            localStorage.removeItem("token");
            return "";
        },
    },
    
})
export const { setToken, removeToken } = jwtSlice.actions;
export default jwtSlice.reducer;