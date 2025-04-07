import { Tabs } from "@mantine/core";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import Card from "./Card";
import useSavedJob from "../../hooks/useSavedJobs";
import { useEffect, useMemo } from "react";
import { getJobs } from "../../Services/JobService";
import { setJobs } from "../../Slices/JobSlice";

const JobHistory = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(
    (state: any) => state.job.jobs
  );
  const user = useSelector(
    (state: any) => state.user
  );
  const { savedJobs } = useSavedJob();


 useEffect(() => {
   const fetchJobs = async () => {
     try {
       const response = await getJobs();
       dispatch(setJobs(response.data));
     } catch (error) {
       console.error(
         "Error fetching jobs:",
         error
       );
     }
   };

   fetchJobs(); 

 }, [dispatch]);



// Memoized job filters
const appliedJobs = useMemo(() => {
  return jobs
    .map((job: any) => {
      const applicant = job.applicants?.find(
        (applicant: any) =>
          applicant.applicantId === user.id
      );
      return applicant
        ? {
            ...job,
            appliedTime: applicant.timeStamp,
            status: applicant.applicationStatus,
          }
        : null;
    })
    .filter(Boolean);
}, [jobs, user.id]);

const filterJobsByStatus = useMemo(
  () => (status: string) =>
    jobs
      .map((job: any) => {
        const applicant = job.applicants?.find(
          (applicant: any) =>
            applicant.applicantId === user.id &&
            applicant.applicationStatus === status
        );
        return applicant
          ? {
              ...job,
              status: status,
              statusTime: applicant.timeStamp,
            }
          : null;
      })
      .filter(Boolean),
  [jobs, user.id]
);

const offeredJobs = useMemo(
  () => filterJobsByStatus("OFFERED"),
  [filterJobsByStatus]
);
const acceptedJobs = useMemo(
  () => filterJobsByStatus("ACCEPTED"),
  [filterJobsByStatus]
);
const rejectedJobs = useMemo(
  () => filterJobsByStatus("REJECTED"),
  [filterJobsByStatus]
);
const inProgressJobs = useMemo(
  () => filterJobsByStatus("INTERVIEWING"),
  [filterJobsByStatus]
);


  return (
    <div className="py-4 mt-4 px-7">
      <Tabs
        variant="outline"
        defaultValue="applied"
      >
        <Tabs.List className="[&_button]:!text-xl [&_button]:!font-semibold [&_button[data-active='true']]:!text-green-500">
          <Tabs.Tab value="applied">
            Applied
          </Tabs.Tab>
          <Tabs.Tab value="saved">Saved</Tabs.Tab>
          <Tabs.Tab value="offered">
            Offered
          </Tabs.Tab>
          <Tabs.Tab value="inprogress">
            In Progress
          </Tabs.Tab>{" "}
          <Tabs.Tab value="accepted">
            Accepted
          </Tabs.Tab>
          <Tabs.Tab value="rejected">
            Rejected
          </Tabs.Tab>
        </Tabs.List>

        <div className="py-4 mt-3">
          <Tabs.Panel value="applied">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {appliedJobs.map(
                (data: any, index: number) => (
                  <Card
                    key={index}
                    {...data}
                    applied
                    status={
                      data.status ===
                        "ACCEPTED" ||
                      data.status === "REJECTED"
                        ? data.status
                        : undefined
                    }
                  />
                )
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="saved">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {jobs
                .filter((job: any) =>
                  savedJobs.includes(job.id)
                )
                .map(
                  (data: any, index: number) => (
                    <Card
                      key={index}
                      {...data}
                      saved
                    />
                  )
                )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="offered">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {offeredJobs.map(
                (data: any, index: number) => (
                  <Card
                    key={index}
                    {...data}
                    offered
                    status={
                      data.status ===
                        "ACCEPTED" ||
                      data.status === "REJECTED"
                        ? data.status
                        : undefined
                    }
                  />
                )
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="inprogress">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {inProgressJobs.map(
                (data: any, index: number) => (
                  <Card
                    key={index}
                    {...data}
                    status="INTERVIEWING"
                  />
                )
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="accepted">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {acceptedJobs.map(
                (data: any, index: number) => (
                  <Card
                    key={index}
                    {...data}
                    status="ACCEPTED"
                  />
                )
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="rejected">
            <div className="py-4 mt-5 grid grid-cols-4 gap-6">
              {rejectedJobs.map(
                (data: any, index: number) => (
                  <Card
                    key={index}
                    {...data}
                    status="REJECTED"
                  />
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
