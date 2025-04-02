import { jobList } from "../../data/JobsData";
import JobCard from "../Find-Jobs/JobCard";
import { useSelector } from "react-redux";

const RecommendedJob = () => {
  const jobs = useSelector((state: any) => state.job.jobs);
  const selectedJob = useSelector((state: any) => state.job.selectedJob);

  return (
    <div className="space-y-5 flex flex-col w-1/3">
      <div className="font-bold text-2xl">Recommended Job</div>
      <div className="py-1 mt-3 px-4 flex flex-wrap gap-4">
        {jobs
          .filter((job: any) => job.id !== selectedJob?.id) // Remove selected job
          .slice(0, 4) // Show only 4 recommended jobs
          .map((data: any, index: number) => (
            <JobCard key={index} {...data} />
          ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
