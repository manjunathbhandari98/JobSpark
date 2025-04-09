import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JobApply from "../components/Job-Apply/JobApply";
import { useMantineColorScheme } from "@mantine/core";

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const { colorScheme } = useMantineColorScheme(); 
        const isDark = colorScheme === "dark";
 return (
   <div
     className={`p-5 ${
       isDark
         ? "bg-[#040611] text-gray-200"
         : "bg-gray-200 text-black"
     }`}
   >
     <div>
       <button
         onClick={() => navigate("/job")}
         className=" bg-green-500/8 cursor-pointer flex py-2 px-4 gap-2 rounded-lg"
       >
         <ArrowLeft />
         Back
       </button>
     </div>
     <div className="w-full mx-auto">
       <JobApply />
     </div>
   </div>
 ); 
};

export default ApplyJobPage;