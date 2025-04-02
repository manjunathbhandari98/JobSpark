import {Divider } from "@mantine/core";
import Card from "../components/Job-Applications/Card";
import { useSelector } from "react-redux";
import useSavedJob from "../hooks/useSavedJobs";


const SavedJobsPage = () => {
  const jobs = useSelector((state:any) => state.job.jobs);
  const {savedJobs} = useSavedJob();
 return (
   <div className="py-5 px-5">
     <Divider size="xz" />
     <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
       {jobs
         .filter((job: any) =>
           savedJobs.includes(job.id)
         ) // Show only saved jobs
         .map((data: any, index: any) => (
           <div key={index}>
             <Card
               {...data}
               saved
             />
           </div>
         ))}
     </div>
   </div>
 ); 
};

export default SavedJobsPage;