import {
  createTheme,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import FindTalent from "./pages/FindTalent";
import TalentProfile from "./pages/TalentProfile.tsx";
import PostJobPage from "./pages/PostJobPage.tsx";

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
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
};

export default App;
