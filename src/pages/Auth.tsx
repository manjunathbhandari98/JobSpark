import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";

const Auth = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(
    location.search
  ).get("mode"); // Extracts 'mode' from URL

  return (
    <div className="flex relative">
      {/* 🔹 Fixed Home Button - Always visible */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-green-500/10 cursor-pointer flex items-center py-2 px-4 gap-2 rounded-lg shadow-md hover:bg-green-500/20 transition"
        >
          <ArrowLeft />
          Home
        </button>
      </div>

      {/* 🔹 Auth Content */}
      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-transform duration-1000 ease-in-out ${
          mode === "signup"
            ? "-translate-x-1/2"
            : ""
        }`}
      >
        <div className="w-1/2 h-full flex items-center justify-center">
          <Login />
        </div>
        <div
          className={`w-1/2 h-full bg-gray-800 flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out ${
            mode === "signup"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          }`}
        >
          <div className="w-fit h-fit">
            <Logo size="extra-larger" />
          </div>
          <div className="text-xl font-semibold">
            Discover Your Career Spark
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Auth;