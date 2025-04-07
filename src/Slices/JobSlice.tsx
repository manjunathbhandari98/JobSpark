import { createSlice } from "@reduxjs/toolkit";
import { postJob, updateJob, deleteJob } from "../Services/JobService";

export interface Applicant {
  id: number;
  name: string;
  email: string;
  resumeUrl: string;
  status: string; // You may want to define an enum for applicant statuses
}

export enum JobStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  IN_PROGRESS = "IN_PROGRESS",
}

export interface Job {
  id: number;
  jobTitle: string;
  company: string;
  applicants: Applicant[];
  about: string;
  experience: string;
  jobType: string;
  location: string;
  packageOffered: number;
  postTime: string; // LocalDateTime should be represented as a string in ISO format
  description: string;
  skillsRequired: string[];
  jobStatus: JobStatus;
}

// Define the initial state type
interface JobState {
  jobs: Job[]; // Explicitly define that `jobs` is an array of `Job`
  selectedJob: Job | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,

  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

    setJob: (state, action) => {
      state.selectedJob = action.payload;
    },

    addJob: (state, action) => {
      postJob(action.payload); // Call API function
      state.jobs.push(action.payload); // Update state
    },

    // JobSlice.js - Simplified editJob
    // In JobSlice.js
    editJob: (state, action) => {
      const updatedJob = action.payload;
      const index = state.jobs.findIndex(
        (job) => job.id === updatedJob.id
      );

      if (index !== -1) {
        // Create a completely new array
        const newJobs = [...state.jobs];
        // Replace the item at the index with the updated one
        newJobs[index] = updatedJob;
        // Assign the new array to the state
        state.jobs = newJobs;
      }
      // If using Redux Toolkit/Immer, you would just do:
      // state.jobs[index] = updatedJob;

      // Update selectedJob if necessary
      if (
        state.selectedJob?.id === updatedJob.id
      ) {
        state.selectedJob = updatedJob; // Immer handles this too if used
      }
    },

    removeJob: (state, action) => {
      deleteJob(action.payload); // Call API function with job ID

      state.jobs = state.jobs.filter(
        (job) => job.id !== action.payload // Ensure correct comparison
      );
    },

    updateApplicantStatus: (state, action) => {
      const { applicantId, newStatus } =
        action.payload;
      const jobToUpdate = state.jobs.find(
        (job) => job.id === state.selectedJob?.id
      );

      if (jobToUpdate) {
        jobToUpdate.applicants =
          jobToUpdate.applicants.map((app) =>
            app.id === applicantId
              ? { ...app, status: newStatus }
              : app
          );
      }

      // Also update selectedJob if it's set
      if (state.selectedJob) {
        state.selectedJob.applicants =
          state.selectedJob.applicants.map(
            (app) =>
              app.id === applicantId
                ? { ...app, status: newStatus }
                : app
          );
      }
    },
  },
});

export const {
  setJobs,
  setJob,
  addJob,
  editJob,
  removeJob,
  updateApplicantStatus,
} = jobSlice.actions;

export default jobSlice.reducer;
