import { useMantineColorScheme } from "@mantine/core";
import {
  useMediaQuery,
} from "@mantine/hooks";
import { ArrowLeft } from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import Logo from "../assets/Logo";
import ForgotPassword from "../components/Auth/ForgotPassword";
import Login from "../components/Auth/Login";
import ResetPassword from "../components/Auth/ResetPassword";
import Signup from "../components/Auth/Signup";
import VerifyOTP from "../components/Auth/VerfiyOTP";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(
    location.search
  ).get("mode");
  const isMobile = useMediaQuery(
    "(max-width: 768px)"
  );

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const brandingBg = isDark
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-black";
  const homeButtonBg = isDark
    ? "bg-green-500/10 hover:bg-green-500/20 text-white"
    : "bg-green-500/10 hover:bg-green-500/20 text-black";

  if (mode === "forgot") {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center">
        <ForgotPassword />
      </div>
    );
  }

  if (mode === "verify-otp") {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center">
        <VerifyOTP />
      </div>
    );
  }

  if (mode === "reset-password") {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center">
        <ResetPassword />
      </div>
    );
  }

  return (
    <div
      className={`flex relative w-full h-screen ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      {/*  Home Button */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigate("/")}
          className={`${homeButtonBg} cursor-pointer flex items-center py-2 px-4 gap-2 rounded-lg shadow-md transition`}
        >
          <ArrowLeft />
          Home
        </button>
      </div>

      {/* Mobile View */}
      {isMobile ? (
        <div className="w-full h-full flex items-center justify-center">
          {mode === "signup" ? (
            <Signup />
          ) : (
            <Login />
          )}
        </div>
      ) : (
        //  Desktop View
        <div
          className={`w-full h-full hidden md:flex [&>*]:flex-shrink-0 transition-transform duration-1000 ease-in-out ${
            mode === "signup"
              ? "-translate-x-1/2"
              : ""
          }`}
        >
          {/* Login Section */}
          <div className="w-1/2 h-full flex items-center justify-center">
            <Login />
          </div>

          {/* Branding */}
          <div
            className={`w-1/2 h-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${brandingBg} ${
              mode === "signup"
                ? "rounded-r-[200px]"
                : "rounded-l-[200px]"
            }`}
          >
            <div className="mb-4">
              <Logo size="extra-larger" />
            </div>
            <div className="text-xl font-semibold text-center px-4">
              Discover Your Career Spark
            </div>
          </div>

          {/* Signup Section */}
          <div className="w-1/2 h-full flex items-center justify-center">
            <Signup />
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
