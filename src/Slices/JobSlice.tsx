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

    editJob: (state, action) => {
      updateJob(
        action.payload.id,
        action.payload
      );
      state.jobs = state.jobs.map((job) =>
        job.id === action.payload.id
          ? action.payload
          : job
      );
    },

    removeJob: (state, action) => {
      deleteJob(action.payload); // Call API function with job ID

      state.jobs = state.jobs.filter(
        (job) => job.id !== action.payload // Ensure correct comparison
      );
    },
  },
});

export const {
  setJobs,
  setJob,
  addJob,
  editJob,
  removeJob,
} = jobSlice.actions;

export default jobSlice.reducer;
