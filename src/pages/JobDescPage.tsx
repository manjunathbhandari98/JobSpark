import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobDesc from "../components/Job-Desc/JobDesc";
import RecommendedJob from "../components/Job-Desc/RecommendedJob";

const JobDescPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <div>
        <button
          onClick={() => navigate("/jobs")}
          className=" bg-green-500/8 cursor-pointer flex py-2 px-4 gap-2 rounded-lg"
        >
          <ArrowLeft />
          Back
        </button>
      </div>
      <div className="w-full flex gap-5 justify-around">
        <JobDesc />
        <RecommendedJob />
      </div>
    </div>
  );
};

export default JobDescPage;
