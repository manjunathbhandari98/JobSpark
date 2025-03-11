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

const theme = createTheme({
  // colors: {
  //   dark: [
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //     "#040611",
  //   ], // ✅ Dark theme requires at least 10 shades
  //   light: [
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //     "#ffffff",
  //   ], // ✅ Light theme requires at least 10 shades
  // },
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
        </Routes>
        <Footer />
      </div>
    </MantineProvider>
  );
};

export default App;
