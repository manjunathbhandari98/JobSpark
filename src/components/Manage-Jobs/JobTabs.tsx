import { Tabs } from "@mantine/core";
import JobsStatus from "./JobsStatus";
import { activeJobs, drafts } from "../../data/PostedJob";

const JobTabs = () => {
 return (
   <div className="px-3 w-1/5">
     <div className="text-2xl font-semibold mb-5">
       Jobs
     </div>
     <Tabs
       variant="pills"
       autoContrast
       defaultValue="active"
     >
       <Tabs.List className="[&_button[aria-selected='false']]:!bg-gray-400 [&_button[aria-selected='false']]:!text-black font-medium]">
         <Tabs.Tab value="active">
           Active[{activeJobs.length}]
         </Tabs.Tab>
         <Tabs.Tab value="drafs">
           Drafs[{drafts.length}]
         </Tabs.Tab>
         <Tabs.Tab value="closed">
           Closed[4]
         </Tabs.Tab>
       </Tabs.List>

       <Tabs.Panel value="active">
         <div className="flex flex-col gap-3 my-4">
           {activeJobs.map((jobs, index) => (
             <JobsStatus
               key={index}
               {...jobs}
             />
           ))}
         </div>
       </Tabs.Panel>

       <Tabs.Panel value="drafs">
         <div className="flex flex-col gap-3 my-4">
           {drafts.map((jobs, index) => (
             <JobsStatus
               key={index}
               {...jobs}
             />
           ))}
         </div>
       </Tabs.Panel>

       <Tabs.Panel value="closed">
         <div className="flex flex-col gap-3 my-4">
           No Jobs
         </div>
       </Tabs.Panel>
     </Tabs>
   </div>
 ); 
};

export default JobTabs;