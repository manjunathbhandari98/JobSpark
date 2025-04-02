import JobCard from "./JobCard";
import Filter from "./Filter.tsx";
import { X } from "lucide-react";
import { jobList } from "../../data/JobsData.tsx";
import { useEffect } from "react";

import { getJobs } from "../../Services/JobService";

import { useSelector, useDispatch } from "react-redux";

import { setJobs } from "../../Slices/JobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
const jobs = useSelector((state: any) => state.job.jobs) || [];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        dispatch(setJobs(response.data));
      } catch (error) { 
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="text-3xl font-bold">
            Recommended Jobs
          </div>
          <div className="bg-green-500 p-2 flex cursor-pointer rounded-lg">
            <X /> Clear Filter
          </div>
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <div className="py-4 mt-5 grid grid-cols-4 gap-4">
        {jobs?.map(
          (data: any, index: number) => (
            <JobCard
              key={index}
              {...data}
            />
          )
        )}
      </div>
    </div>
  );
};
export default Jobs;
