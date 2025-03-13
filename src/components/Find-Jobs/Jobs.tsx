import JobCard from "./JobCard";
import Filter from "./Filter.tsx";
import { X } from "lucide-react";

const Jobs = () => {
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
      <div className="py-4 mt-5">
        <JobCard />
      </div>
    </div>
  );
};
export default Jobs;
