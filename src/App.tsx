import { lazy, Suspense } from "react";
import {
  createTheme,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import Store from "./App/Store";
import AppRoutes from "./routes/index.tsx";

// Lazy load pages
const HomePage = lazy(
  () => import("./pages/HomePage")
);
const FindJobs = lazy(
  () => import("./pages/FindJobs")
);
const FindTalent = lazy(
  () => import("./pages/FindTalent")
);
const TalentProfile = lazy(
  () => import("./pages/TalentProfile.tsx")
);
const PostJobPage = lazy(
  () => import("./pages/PostJobPage.tsx")
);
const JobDescPage = lazy(
  () => import("./pages/JobDescPage.tsx")
);
const ApplyJobPage = lazy(
  () => import("./pages/ApplyJobPage.tsx")
);
const CompanyPage = lazy(
  () => import("./pages/CompanyPage.tsx")
);
const ManageJobsPage = lazy(
  () => import("./pages/ManageJobsPage.tsx")
);
const JobApplicationsPage = lazy(
  () => import("./pages/JobApplicationsPage.tsx")
);
const Auth = lazy(
  () => import("./pages/Auth.tsx")
);
const ProfilePage = lazy(
  () => import("./pages/ProfilePage.tsx")
);
const SavedJobsPage = lazy(
  () => import("./pages/SavedJobsPage.tsx")
);

// Loader component (better UX)
const Loader = () => (
  <div className="text-center py-5">
    Loading...
  </div>
);

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
    ],
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
    ],
    greenTheme: [
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#15803d",
      "#166534",
      "#14532d",
      "#052e16",
    ],
  },
  fontFamily: "Poppins,sans-serif",
});

const App = () => {
  return (
    <Provider store={Store}>
      <MantineProvider
        defaultColorScheme="dark"
        theme={theme}
      >
        <Notifications />

        <div className="min-h-screen text-white dark:bg-[#040611] light:bg-white">
          <BrowserRouter>
            <div className="relative">
              <Header />
              <AppRoutes />
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </MantineProvider>
    </Provider>
  );
};

export default App;
