import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../Services/ProfileService";

const useSavedJob = () => {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );

  const toggleSavedJob = async (
    jobId: string
  ) => {
    try {
      const currentSavedJobs =
        profile?.savedJobs || [];
      const isJobSaved =
        currentSavedJobs.includes(jobId);

      const updatedSavedJobs = isJobSaved
        ? currentSavedJobs.filter(
            (id: string) => id !== jobId
          )
        : [...currentSavedJobs, jobId];

      const updatedProfile = {
        ...profile,
        savedJobs: updatedSavedJobs,
      };

      const response = await updateProfile(
        updatedProfile
      );

      // Update the Redux store
      dispatch(changeProfile(response.data));

      // Show feedback
      notifications.show({
        title: isJobSaved
          ? "Removed from Saved"
          : "Saved Job",
        message: isJobSaved
          ? "Job removed from your saved list."
          : "Job added to your saved list.",
        color: isJobSaved ? "red" : "green",
      });
    } catch (error) {
      console.error(
        "Failed to toggle saved job:",
        error
      );
      notifications.show({
        title: "Error",
        message:
          "Could not update saved jobs. Please try again.",
        color: "red",
      });
    }
  };

  return {
    toggleSavedJob,
    savedJobs: profile?.savedJobs || [],
  };
};

export default useSavedJob;
