import { jobList } from "../../data/JobsData";
import JobCard from "../Find-Jobs/JobCard";

const CompanyJobs = (props:any) => {
 return (
   <div className="py-4 mt-5 grid grid-cols-3 gap-4">
     {jobList
       .filter(
         (job) => job.company === props.Name
       )
       .map((job, index) => (
         <div
           key={index}
           className=""
         >
           <JobCard {...job} />
         </div>
       ))}
   </div>
 ); 
};

export default CompanyJobs;