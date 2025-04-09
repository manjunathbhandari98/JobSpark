import { useSelector } from "react-redux";
import JobCard from "../Find-Jobs/JobCard";

const RecommendedJob = () => {
  const jobs = useSelector(
    (state: any) => state.job.jobs
  );
  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-xl lg:text-2xl">
        Recommended Jobs
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {jobs
          .filter(
            (job: any) =>
              job.id !== selectedJob?.id
          )
          .slice(0, 4)
          .map((job: any, index: number) => (
            <JobCard
              key={index}
              {...job}
            />
          ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
