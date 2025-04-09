import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Provider } from "react-redux";
import Store from "./App/Store";
import AppRoutes from "./routes";
import ThemeProviderWrapper from "./App/ThemeProviderWrapper";

const App = () => {
  return (
    <Provider store={Store}>
      <ThemeProviderWrapper>
        <div className="min-h-screen text-white dark:bg-[#040611] light:bg-white">
          <BrowserRouter>
            <Header />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </div>
      </ThemeProviderWrapper>
    </Provider>
  );
};

export default App;
