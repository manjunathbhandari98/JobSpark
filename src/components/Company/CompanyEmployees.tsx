import { talents } from "../../data/TalentData";
import TalentCard from "../Find-Talents/TalentCard";

const CompanyEmployees = (props:any) => {
 return (
   <div className="py-4 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {talents
       .filter(
         (data) => data.company === props.Name
       )
       .map(
         (data, index) =>
           index < 6 && (
             <div
               key={index}
               className=""
             >
               <TalentCard {...data} />
             </div>
           )
       )}
   </div>
 ); 
};

export default CompanyEmployees;