import { useEffect } from "react";
import { useSelector } from "react-redux";
import JobsDesc from "../components/Manage-Jobs/JobsDesc";
import JobTabs from "../components/Manage-Jobs/JobTabs";

const ManageJobsPage = () => {
  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );

  useEffect(() =>{
    selectedJob
  },[])

  return (
    <div className="flex flex-col md:flex-row gap-5 ">
      <div className="md:w-[25%]">
        <JobTabs />
      </div>
      {/* Only show job desc if a job is selected */}
      {selectedJob && (
        <div className="md:w-[75%]">
          <JobsDesc />
        </div>
      )}
    </div>
  );
};

export default ManageJobsPage;
