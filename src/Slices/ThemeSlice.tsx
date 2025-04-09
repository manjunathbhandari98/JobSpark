import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  colorScheme: "light" | "dark";
}

const initialState: ThemeState = {
  colorScheme: "dark",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.colorScheme =
        state.colorScheme === "light"
          ? "dark"
          : "light";
    },
    setTheme: (state, action) => {
      state.colorScheme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } =
  ThemeSlice.actions;
export default ThemeSlice.reducer;
