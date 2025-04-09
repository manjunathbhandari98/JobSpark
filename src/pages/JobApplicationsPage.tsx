import { useMantineColorScheme } from "@mantine/core";
import JobHistory from "../components/Job-Applications/JobHistory";


const JobApplicationsPage = () => {
    const { colorScheme } = useMantineColorScheme(); 
       const isDark = colorScheme === "dark";
 return (
   <div
     className={`flex flex-col gap-4 ${
       isDark
         ? "bg-[#040611] text-gray-200"
         : "bg-gray-200 text-black"
     }`}
   >
     <div className="py-4 px-3 text-3xl font-semibold">
       Job Applications
     </div>
     <JobHistory />
   </div>
 ); 
};

export default JobApplicationsPage;