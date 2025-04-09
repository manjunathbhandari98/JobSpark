import { jobList } from "../../data/JobsData";
import JobCard from "../Find-Jobs/JobCard";

const CompanyJobs = (props: any) => {
  const filteredJobs = jobList.filter(
    (job) => job.company === props.Name
  );

  return (
    <div className="py-4 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredJobs.map((job, index) => (
        <JobCard
          key={index}
          {...job}
        />
      ))}
    </div>
  );
};

export default CompanyJobs;
