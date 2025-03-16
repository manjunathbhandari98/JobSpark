
import JobsDesc from "../components/Manage-Jobs/JobsDesc";
import JobTabs from "../components/Manage-Jobs/JobTabs";

const ManageJobsPage = () => {
 return (
    <div className="flex gap-5">
     <JobTabs/>
     <JobsDesc/>

    </div>
   

 ); 
};

export default ManageJobsPage;