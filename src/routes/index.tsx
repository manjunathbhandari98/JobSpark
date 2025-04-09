import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import RoutePaths from "./RoutePath";
import EditJob from "../components/Manage-Jobs/EditJob";
import { Loader } from "@mantine/core";
import LoadingScreen from '../Utils/LoadingScreen'
import ProfileOptions from "../components/common/ProfileOptions";

// Lazy load pages
const HomePage = lazy(
  () => import("../pages/HomePage")
);
const FindJobs = lazy(
  () => import("../pages/FindJobs")
);
const FindTalent = lazy(
  () => import("../pages/FindTalent")
);
const TalentProfile = lazy(
  () => import("../pages/TalentProfile")
);
const PostJobPage = lazy(
  () => import("../pages/PostJobPage")
);
const JobDescPage = lazy(
  () => import("../pages/JobDescPage")
);
const ApplyJobPage = lazy(
  () => import("../pages/ApplyJobPage")
);
const CompanyPage = lazy(
  () => import("../pages/CompanyPage")
);
const ManageJobsPage = lazy(
  () => import("../pages/ManageJobsPage")
);
const JobApplicationsPage = lazy(
  () => import("../pages/JobApplicationsPage")
);
const Auth = lazy(() => import("../pages/Auth"));
const ProfilePage = lazy(
  () => import("../pages/ProfilePage")
);
const SavedJobsPage = lazy(
  () => import("../pages/SavedJobsPage")
);


const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route
            path={RoutePaths.HOME}
            element={<HomePage />}
          />
          <Route
            path={RoutePaths.JOBS}
            element={<FindJobs />}
          />
          <Route
            path={RoutePaths.TALENT}
            element={<FindTalent />}
          />
          <Route
            path={RoutePaths.TALENT_PROFILE}
            element={<TalentProfile />}
          />

          <Route
            path={RoutePaths.JOB_DESC}
            element={<JobDescPage />}
          />

          <Route
            path={RoutePaths.COMPANY}
            element={<CompanyPage />}
          />
          <Route
            path={RoutePaths.AUTH}
            element={<Auth />}
          />
          <Route
            path={RoutePaths.PROFILE_OPTIONS}
            element={<ProfileOptions />}
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route
            path={RoutePaths.MANAGE_JOBS}
            element={<ManageJobsPage />}
          />
          <Route
            path={RoutePaths.APPLICATIONS}
            element={<JobApplicationsPage />}
          />
          <Route
            path={RoutePaths.PROFILE}
            element={<ProfilePage />}
          />
          <Route
            path={RoutePaths.POST_JOB}
            element={<PostJobPage />}
          />
          <Route
            path={RoutePaths.SAVED_JOBS}
            element={<SavedJobsPage />}
          />
          <Route
            path={RoutePaths.EDIT_JOB}
            element={<EditJob />}
          />
          <Route
            path={RoutePaths.JOB_APPLY}
            element={<ApplyJobPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
