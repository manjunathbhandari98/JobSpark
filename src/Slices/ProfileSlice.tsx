import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [], // Added to store multiple profiles
    selectedProfile: null, // Holds a single selected profile
  },

  reducers: {
    // Set a single profile
    setProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },

    // Set multiple profiles
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },

    // Update profile
    changeProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },


  },
});

export const {
  setProfile,
  setProfiles,
  changeProfile,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
