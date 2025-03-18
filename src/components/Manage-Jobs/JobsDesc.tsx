import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../Job-Desc/JobDesc";
import { talents } from "../../data/TalentData";
import TalentCard from "../Find-Talents/TalentCard";

const applicantsOverview = () => {
    
 return (
   <div className="py-4 px-3 w-full">
     {/* role */}
     <div className="flex flex-col gap-2">
       <div className="flex gap-4">
         <div className="font-semibold text-2xl">
           Sales Executive
         </div>
         <div>
           <Badge
             variant="light"
             color="greenTheme.5"
           >
             Active{" "}
           </Badge>
         </div>
       </div>
       <div className="">Bengaluru</div>
     </div>

     {/* tabs */}
     <div className="py-4 mt-4 px-7">
       <Tabs
         variant="outline"
         defaultValue="overview"
       >
         <Tabs.List className="[&_button]:!text-xl  [&_button]:!font-semibold [&_button[data-active='true']]:!text-green-500">
           <Tabs.Tab value="overview">
             Overview
           </Tabs.Tab>
           <Tabs.Tab value="applicants">
             Applicants
           </Tabs.Tab>
           <Tabs.Tab value="invited">
             Invited
           </Tabs.Tab>
           <Tabs.Tab value="offered">
             Offered
           </Tabs.Tab>
           <Tabs.Tab value="rejected">
             Rejected
           </Tabs.Tab>
         </Tabs.List>
         <div></div>
         <Tabs.Panel
           value="overview"
           className="[&>div]:w-full"
         >
           <JobDesc edit />
         </Tabs.Panel>
         <Tabs.Panel value="applicants">
           <div className="py-4 mt-5 grid grid-cols-2 gap-6 ">
             {talents.map(
               (data, index) =>
                 index < 4 && (
                   <div
                     key={index}
                     className=""
                   >
                     <TalentCard
                       {...data}
                       manage
                     />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
         <Tabs.Panel value="invited">
           <div className="py-4 mt-5 grid grid-cols-2 gap-6 ">
             {talents.map(
               (data, index) =>
                 index < 4 && (
                   <div
                     key={index}
                     className=""
                   >
                     <TalentCard
                       {...data}
                       invite
                     />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
         <Tabs.Panel value="offered">
           Offered
         </Tabs.Panel>
         <Tabs.Panel value="rejected">
           Rejected
         </Tabs.Panel>
       </Tabs>
     </div>
   </div>
 ); 
};

export default applicantsOverview;