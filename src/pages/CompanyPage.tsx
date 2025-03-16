import { ArrowLeft } from "lucide-react";
import CompanyInfo from "../components/Company/CompanyInfo";
import { Divider, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import About from "../components/Company/About";
import CompanyJobs from "../components/Company/CompanyJobs";
import CompanyEmployees from "../components/Company/CompanyEmployees";
import SimilarCompanies from "../components/Company/SimilarCompanies";
import { companyData } from "../data/Company";

const CompanyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | null>('about')
    const company = companyData;
 return (
   <div className="p-5">
     <div>
       <button
         onClick={() => navigate(-1)}
         className=" bg-green-500/8 flex py-2 px-4 gap-2 rounded-lg"
       >
         <ArrowLeft />
         Back
       </button>
     </div>
     <div className="flex gap-5">
       <div className="w-3/4">
         {/* company profile */}
         <div className="flex flex-col gap-5">
           <CompanyInfo {...company} />

           <Divider size="xs" />

           <div>
             <Tabs
               variant="outline"
               value={activeTab}
               onChange={setActiveTab}
             >
               <Tabs.List className="[&_button]:!text-lg  [&_button]:!font-medium [&_button[data-active='true']]:!text-green-500">
                 <Tabs.Tab value="about">
                   About
                 </Tabs.Tab>
                 <Tabs.Tab value="jobs">
                   Jobs
                 </Tabs.Tab>
                 <Tabs.Tab value="employees">
                   Employees
                 </Tabs.Tab>
               </Tabs.List>

               <Tabs.Panel value="about">
                 <About />
               </Tabs.Panel>
               <Tabs.Panel value="jobs">
                 <CompanyJobs {...company} />
               </Tabs.Panel>
               <Tabs.Panel value="employees">
                 <CompanyEmployees {...company} />
               </Tabs.Panel>
             </Tabs>
           </div>
         </div>
       </div>
       <div className="w-1/4 pt-4">
         {/* similar companies */}
         <SimilarCompanies />
       </div>
     </div>
   </div>
 ); 
};

export default CompanyPage;