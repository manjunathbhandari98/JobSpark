import { ExternalLink} from "lucide-react";
import { similar } from "../../data/Company";

const SimilarCompanies = () => {
 return (<div className="py-2 px-2 flex flex-col gap-5">
        <div className="text-xl font-semibold">Similar Companies</div>
        <div className="flex flex-col gap-5">
            {similar.map((company,index) =>(
                <div key={index} className="p-2 bg-gray-800 flex justify-between rounded-lg">
                <div className="flex gap-2 items-center">
                    <div>
                        <div className="bg-gray-700 rounded-xl p-2">
                            <img src={`/Icons/${company.name}.png`} alt="" className="h-7" />
                        </div>
                    </div>
                    <div>
                        <div>{company.name}</div>
                        <div>{company.employees} Employees</div>
                    </div>
                </div>
                <div className="text-green-500 flex items-center">
                    <ExternalLink />
                </div>
            </div>
            ))}
            
        </div>
    </div>) 
};

export default SimilarCompanies;