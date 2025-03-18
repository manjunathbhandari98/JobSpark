
import { Tabs } from '@mantine/core';
import { talents } from '../../data/TalentData';
import { jobList } from '../../data/JobsData';
import JobCard from '../Find-Jobs/JobCard';
import Card from './Card';

const JobHistory = () => {
 return (
   <div className="py-4 mt-4 px-7">
     <Tabs
       variant="outline"
       defaultValue="applied"
     >
       <Tabs.List className="[&_button]:!text-xl  [&_button]:!font-semibold [&_button[data-active='true']]:!text-green-500">
         <Tabs.Tab value="applied">
           Applied
         </Tabs.Tab>
         <Tabs.Tab value="saved">Saved</Tabs.Tab>
         <Tabs.Tab value="offered">
           offered
         </Tabs.Tab>
         <Tabs.Tab value="in-progress">
           In Progress
         </Tabs.Tab>
       </Tabs.List>
       <div className="py-4 mt-3">
         <Tabs.Panel
           value="applied"
           className="[&>div]:w-full"
         >
           <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
             {jobList.map(
               (data, index) =>
                 index < 2 && (
                   <div
                     key={index}
                     className=""
                   >
                     <Card {...data} applied />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
         <Tabs.Panel value="saved">
           <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
             {jobList.map(
               (data, index) =>
                 index < 2 && (
                   <div
                     key={index}
                     className=""
                   >
                     <Card {...data} saved />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
         <Tabs.Panel value="offered">
           <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
             {jobList.map(
               (data, index) =>
                 index < 2 && (
                   <div
                     key={index}
                     className=""
                   >
                     <Card {...data} offered />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
         <Tabs.Panel value="in-progress">
           <div className="py-4 mt-5 grid grid-cols-4 gap-6 ">
             {jobList.map(
               (data, index) =>
                 index < 2 && (
                   <div
                     key={index}
                     className=""
                   >
                     <Card {...data} />
                   </div>
                 )
             )}
           </div>
         </Tabs.Panel>
       </div>
     </Tabs>
   </div>
 ); 
};

export default JobHistory;