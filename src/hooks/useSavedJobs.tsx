import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const useSavedJob = () => {
  const profile = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();

  const toggleSavedJob = (jobId: string) => {
    const savedJobs = profile.savedJobs || [];

    const isJobSaved = savedJobs.includes(jobId);
    const updatedSavedJobs = isJobSaved
      ? savedJobs.filter(
          (id: string) => id !== jobId
        ) // Remove if already saved
      : [...savedJobs, jobId]; // Add if not saved

    dispatch(
      changeProfile({
        ...profile,
        savedJobs: updatedSavedJobs,
      })
    );

    notifications.show({
      title: isJobSaved
        ? "Job Removed from Saved"
        : "Job Saved",
      message: isJobSaved
        ? "Job has been removed from saved jobs."
        : "Job has been saved successfully.",
    });
  };

  return {
    toggleSavedJob,
    savedJobs: profile.savedJobs || [],
  };
};

export default useSavedJob;
