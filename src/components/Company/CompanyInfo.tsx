import { Avatar } from "@mantine/core";
import { MapPin } from "lucide-react";

const CompanyInfo = (props:any) => {
 return (
   <div className="my-4">
     {/* banner */}
     <div className="relative mb-15">
       <img
         src="/Profile/banner.jpg"
         alt="banner"
         className="rounded-t-3xl"
       />
       {/* profile image */}
       <div className="top-25 left-5 absolute p-2 dark:bg-[#040611] light:bg-white rounded-2xl">
         <img
           src="Icons/Google.png"
           alt=""
           className="h-30 rounded-2xl"
         />
       </div>
     </div>
     {/* company info */}
     <div className="flex justify-between px-6">
       {/* company name & location */}
       <div className="flex flex-col gap-2">
         <div className="text-3xl font-semibold">
           {props.Name}
         </div>
         <div className="flex text-lg gap-2">
           <MapPin />
           {props.Headquarters}
         </div>
       </div>

       {/* applicants */}
       <div>
         <Avatar.Group>
           <Avatar src="avatar.png" />
           <Avatar src="avatar1.png" />
           <Avatar src="avtar2.png" />
           <Avatar>+10K</Avatar>
         </Avatar.Group>
       </div>
     </div>
   </div>
 ); 
};

export default CompanyInfo;