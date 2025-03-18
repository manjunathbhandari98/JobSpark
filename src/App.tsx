import {
  createTheme,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import FindTalent from "./pages/FindTalent";
import TalentProfile from "./pages/TalentProfile.tsx";
import PostJobPage from "./pages/PostJobPage.tsx";
import JobDescPage from "./pages/JobDescPage.tsx";
import ApplyJobPage from "./pages/ApplyJobPage.tsx";
import CompanyPage from "./pages/CompanyPage.tsx";
import ManageJobsPage from "./pages/ManageJobsPage.tsx";
import JobApplicationsPage from "./pages/JobApplicationsPage.tsx";
import Auth from "./pages/Auth.tsx";
import { useLocalStorage } from "@mantine/hooks";
import ProfilePage from "./pages/ProfilePage.tsx";
import SavedJobsPage from "./pages/SavedJobsPage.tsx";

const theme = createTheme({
  primaryColor: "greenTheme",
  primaryShade: 5,
  colors: {
    darkTheme: [
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
      "#040611",
    ], // ✅ Dark theme requires at least 10 shades
    lightTheme: [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ], // ✅ Light theme requires at least 10 shades
    greenTheme: [
      "#dcfce7", // green-100
      "#bbf7d0", // green-200
      "#86efac", // green-300
      "#4ade80", // green-400
      "#22c55e", // green-500
      "#16a34a", // green-600
      "#15803d", // green-700
      "#166534", // green-800
      "#14532d", // green-900
      "#052e16", // green-950 (extra dark)
    ],
  },
  fontFamily: "Poppins,sans-serif",
});

const App = () => {
  
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={theme}
    >
      <div className="min-h-screen text-white dark:bg-[#040611] light:bg-white">
        <div className="relative">
          <Header />
          <Routes>
            <Route
              path="/jobs"
              element={<FindJobs />}
            />
            <Route
              path="*"
              element={<HomePage />}
            />
            <Route
              path="/talent"
              element={<FindTalent />}
            />
            <Route
              path="/talent-profile"
              element={<TalentProfile />}
            />
            <Route
              path="/post-job"
              element={<PostJobPage />}
            />
            <Route
              path="/job"
              element={<JobDescPage />}
            />
            <Route
              path="/job-apply"
              element={<ApplyJobPage />}
            />
            <Route
              path="/company"
              element={<CompanyPage />}
            />
            <Route
              path="/manage-jobs"
              element={<ManageJobsPage />}
            />
            <Route
              path="/applications"
              element={<JobApplicationsPage />}
            />
            <Route
              path="/auth"
              element={<Auth />}
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
            />

            <Route
            path="/saved-jobs"
            element={<SavedJobsPage/>}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
