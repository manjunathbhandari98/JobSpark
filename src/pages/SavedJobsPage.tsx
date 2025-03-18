import {Divider } from "@mantine/core";
import { jobList } from "../data/JobsData";
import Card from "../components/JobA-Applications/Card";

const SavedJobsPage = () => {
 return (
   <div className="py-5 px-5">
     <Divider size="xz" />
     <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
       {jobList.map(
         (data, index) =>
           index < 2 && (
             <div
               key={index}
               className=""
             >
               <Card
                 {...data}
                 saved
               />
             </div>
           )
       )}
     </div>
   </div>
 ); 
};

export default SavedJobsPage;