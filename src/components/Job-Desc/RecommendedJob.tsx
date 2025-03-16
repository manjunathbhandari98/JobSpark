import { jobList } from "../../data/JobsData";
import JobCard from "../Find-Jobs/JobCard";

const RecommendedJob = () => {
  return (
    <div className="space-y-5 flex flex-col w-1/3">
      <div className="font-bold text-2xl">
        Recommended Job
      </div>
      <div className="py-1 mt-3 px-4 flex flex-wrap gap-4">
        {jobList
          .slice(0, 4) // Show only 3 recommended profiles
          .map((data, index) => (
            <JobCard
              key={index}
              {...data}
            />
          ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
