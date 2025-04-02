import { Tabs } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import useSavedJob from "../../hooks/useSavedJobs";
import { useEffect } from "react";
import { getJobs } from "../../Services/JobService";
import { setJobs } from "../../Slices/JobSlice";

const JobHistory = () => {

  const dispatch = useDispatch();

   useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await getJobs();
          dispatch(setJobs(response.data));
        } catch (error) { 
          console.error("Error fetching jobs:", error);
        }
      };
  
      fetchJobs();
    }, [dispatch]);

  const jobs = useSelector(
    (state: any) => state.job.jobs
  );
  const user = useSelector(
    (state: any) => state.user
  );

 
  // Filter jobs where the user has applied (i.e., user.id exists in applicants array)
  const appliedJobs = jobs
    ?.map((job: any) => {
      const applicant = job.applicants?.find(
        (applicant: any) =>
          applicant.applicantId === user.id
      );

      return applicant
        ? {
            ...job,
            appliedTime: applicant.timeStamp,
          }
        : null;
    })
    .filter(Boolean);
  const {savedJobs} = useSavedJob();

 useEffect(() => {
    console.log(jobs);
    
  },[])

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
            Offered
          </Tabs.Tab>
          <Tabs.Tab value="in-progress">
            In Progress
          </Tabs.Tab>
        </Tabs.List>
        <div className="py-4 mt-3">
          {/* Applied Jobs Tab */}
          <Tabs.Panel
            value="applied"
            className="[&>div]:w-full"
          >
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {appliedJobs?.map(
                (data: any, index: any) => (
                  <div key={index}>
                    <Card
                      {...data}
                      applied
                    />
                  </div>
                )
              )}
            </div>
          </Tabs.Panel>

          {/* Other Tabs: Saved, Offered, In-Progress */}
          <Tabs.Panel value="saved">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {jobs
                .filter((job:any) =>
                  savedJobs.includes(job.id)
                ) // Show only saved jobs
                .map((data:any, index:any) => (
                  <div key={index}>
                    <Card
                      {...data}
                      saved
                    />
                  </div>
                ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {jobs.map(
                (data: any, index: any) =>
                  index < 2 && (
                    <div key={index}>
                      <Card
                        {...data}
                        offered
                      />
                    </div>
                  )
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="in-progress">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {jobs.map(
                (data: any, index: any) =>
                  index < 2 && (
                    <div key={index}>
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
