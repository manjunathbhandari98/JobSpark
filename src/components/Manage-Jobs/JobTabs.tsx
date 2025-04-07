import { Tabs } from "@mantine/core";
import JobsStatus from "./JobsStatus";
import { useEffect } from "react";
import { getJobs } from "../../Services/JobService";
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setJob } from "../../Slices/JobSlice";

const JobTabs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: any) => state.job.jobs) || [];
  const user = useSelector((state:any) => state.user);

  const postedJobs = jobs.filter((job:any) => job.postedBy === user.id);

  const activeJobs = postedJobs.filter((job: any) => job.jobStatus === "ACTIVE");
  const drafts = postedJobs.filter((job: any) => job.jobStatus === "DRAFT");
  const closed = postedJobs.filter((job: any) => job.jobStatus === "CLOSED");

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

  return (
    <div className="px-3 w-2/7">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <Tabs variant="pills" autoContrast defaultValue="active">
        <Tabs.List className="[&_button[aria-selected='false']]:!bg-gray-400 [&_button[aria-selected='false']]:!text-black font-medium]">
          <Tabs.Tab value="active">Active [{activeJobs.length}]</Tabs.Tab>
          <Tabs.Tab value="drafts">Drafts [{drafts.length}]</Tabs.Tab>
          <Tabs.Tab value="closed">Closed [{closed.length}]</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <div className="flex flex-col gap-3 my-4 cursor-pointer">
            {activeJobs.map((job: any, index: number) => (
  <div key={job.id || `active-${index}`} onClick={() => dispatch(setJob(job))}>
    <JobsStatus {...job} />
  </div>
))}

          </div>
        </Tabs.Panel>

        <Tabs.Panel value="drafts">
          <div className="flex flex-col gap-3 my-4 cursor-pointer">
            {drafts.map((job: any, index:number) => (
              <div key={job.id ||`drafts-${index}`} onClick={() => dispatch(setJob(job))}>
                <JobsStatus {...job} />
              </div>
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="closed">
          <div className="flex flex-col gap-3 my-4 cursor-pointer">
            {closed.map((job: any, index:number) => (
              <div key={job.id || `closed-${index}`} onClick={() => dispatch(setJob(job))}>
                <JobsStatus {...job} />
              </div>
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobTabs;
