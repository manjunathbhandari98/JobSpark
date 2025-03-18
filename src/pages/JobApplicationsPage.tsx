import JobHistory from "../components/JobA-Applications/JobHistory";

const JobApplicationsPage = () => {
 return (<div className="flex flex-col gap-4">
    <div className="py-4 px-3 text-3xl font-semibold">Job Applications</div>
    <JobHistory/>
 </div>) 
};

export default JobApplicationsPage;