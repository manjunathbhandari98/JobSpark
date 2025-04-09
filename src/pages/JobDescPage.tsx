import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobDesc from "../components/Job-Desc/JobDesc";
import RecommendedJob from "../components/Job-Desc/RecommendedJob";
import { useMantineColorScheme } from "@mantine/core";

const JobDescPage = () => {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme(); 
      const isDark = colorScheme === "dark";

  return (
    <div
      className={`p-4 ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      <button
        onClick={() => navigate("/jobs")}
        className="bg-green-500/10 text-green-500 mb-4 flex items-center gap-2 px-4 py-2 rounded-md w-fit"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Job Description - takes more space */}
        <div className="w-full lg:w-2/3">
          <JobDesc />
        </div>

        {/* Recommended Jobs - on right for large, below for mobile */}
        <div className="w-full lg:w-1/3">
          <RecommendedJob />
        </div>
      </div>
    </div>
  );
};

export default JobDescPage;
