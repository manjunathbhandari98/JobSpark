import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

// Creating a Redux slice for managing profile state
const ProfileSlice = createSlice({
  name: "profile", // Slice name
  initialState: {}, // Initial state of the profile (empty object)

  reducers: {
    // Action to set the profile state with a new profile object
    setProfile: (state, action) => {
      state = action.payload; // Replacing the state with the new profile data
      return state; // Return the updated state
    },

    // Action to update the profile
    changeProfile: (state, action) => {
      state = updateProfile(action.payload); // Call the API function to update the profile
      return action.payload; // Return the updated profile data
    },
  },
});



// Exporting actions to be used in components
export const { setProfile, changeProfile } =
  ProfileSlice.actions;

// Exporting reducer to be used in the Redux store
export default ProfileSlice.reducer;
