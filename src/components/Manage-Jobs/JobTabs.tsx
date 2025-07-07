import { Tabs, useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { getJobs } from "../../Services/JobService";
import {
  setJob,
  setJobs,
} from "../../Slices/JobSlice";
import JobsStatus from "./JobsStatus";

const JobTabs = () => {
  const dispatch = useDispatch();
  const jobs =
    useSelector((state: any) => state.job.jobs) ||
    [];
  const user = useSelector(
    (state: any) => state.user
  );
  const { colorScheme } = useMantineColorScheme(); 
     const isDark = colorScheme === "dark";

  const postedJobs = jobs.filter( 
    (job: any) => job.postedBy === user.id
  );
  const activeJobs = postedJobs.filter(
    (job: any) => job.jobStatus === "ACTIVE"
  );
  const drafts = postedJobs.filter(
    (job: any) => job.jobStatus === "DRAFT"
  );
  const closed = postedJobs.filter(
    (job: any) => job.jobStatus === "CLOSED"
  );

  useEffect(() => {
    getJobs().then((res) =>
      dispatch(setJobs(res.data))
    );
    
    
  }, [dispatch]);

  useEffect(() =>{
    console.log('posted jobs:',postedJobs)
    console.log('drafts: ', drafts);
  },[postedJobs,drafts])

  return (
    <div
      className={`${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      } p-4 rounded-md`}
    >
      <div className="text-2xl font-semibold mb-5">
        Jobs
      </div>
      <Tabs
        variant="pills" 
        autoContrast
        defaultValue="active"
      >
        <Tabs.List className="[&_button[aria-selected='false']]:!bg-gray-400  [&_button[aria-selected='false']]:!text-black font-medium">
          <Tabs.Tab value="active">
            Active [{activeJobs.length}]
          </Tabs.Tab>
          <Tabs.Tab value="drafts">
            Drafts [{drafts.length}]
          </Tabs.Tab>
          <Tabs.Tab value="closed">
            Closed [{closed.length}]
          </Tabs.Tab>
        </Tabs.List>

        {["active", "drafts", "closed"].map(
          (status) => (
            <Tabs.Panel
              value={status}
              key={status}
            >
              <div className="flex flex-col gap-3 my-4 cursor-pointer">
                {(status === "active"
                  ? activeJobs
                  : status === "drafts"
                  ? drafts
                  : closed
                ).map((job: any, i: number) => (
                  <div
                    key={
                      job.id || `${status}-${i}`
                    }
                    onClick={() =>
                      dispatch(setJob(job))
                    }
                  >
                    <JobsStatus {...job} />
                  </div>
                ))}
              </div>
            </Tabs.Panel>
          )
        )}
      </Tabs>
    </div>
  );
};

export default JobTabs;
