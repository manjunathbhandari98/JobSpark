import { Tabs } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSavedJob from "../../hooks/useSavedJobs";
import { getJobs } from "../../Services/JobService";
import { setJobs } from "../../Slices/JobSlice";
import Card from "./Card";

const JobHistory = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: any) => state.job.jobs);
  const user = useSelector((state: any) => state.user);
  const { savedJobs } = useSavedJob();

  const [activeTab, setActiveTab] = useState<string | null>("applied");


  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      dispatch(setJobs(response.data));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Initial fetch
  }, [dispatch]);

  useEffect(() => {
    fetchJobs(); // Re-fetch on tab change
  }, [activeTab]);

  const appliedJobs = useMemo(() => {
    return jobs
      .map((job: any) => {
        const applicant = job.applicants?.find(
          (applicant: any) => applicant.applicantId === user.id
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

  const offeredJobs = useMemo(() => filterJobsByStatus("OFFERED"), [filterJobsByStatus]);
  const acceptedJobs = useMemo(() => filterJobsByStatus("ACCEPTED"), [filterJobsByStatus]);
  const rejectedJobs = useMemo(() => filterJobsByStatus("REJECTED"), [filterJobsByStatus]);
  const inProgressJobs = useMemo(() => filterJobsByStatus("INTERVIEWING"), [filterJobsByStatus]);

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <Tabs
        variant="outline"
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List className="flex flex-wrap gap-2 overflow-x-auto whitespace-nowrap [&_button]:!text-base sm:[&_button]:!text-lg [&_button]:!font-semibold [&_button[data-active='true']]:!text-green-500">
          <Tabs.Tab value="applied">Applied</Tabs.Tab>
          <Tabs.Tab value="saved">Saved</Tabs.Tab>
          <Tabs.Tab value="offered">Offered</Tabs.Tab>
          <Tabs.Tab value="inprogress">In Progress</Tabs.Tab>
          <Tabs.Tab value="accepted">Accepted</Tabs.Tab>
          <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
        </Tabs.List>

        <div className="py-4">
          <Tabs.Panel value="applied">
            <JobsGrid data={appliedJobs} type="applied" />
          </Tabs.Panel>
          <Tabs.Panel value="saved">
            <JobsGrid data={jobs.filter((j: any) => savedJobs.includes(j.id))} type="saved" />
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            <JobsGrid data={offeredJobs} type="offered" />
          </Tabs.Panel>
          <Tabs.Panel value="inprogress">
            <JobsGrid data={inProgressJobs} type="INTERVIEWING" />
          </Tabs.Panel>
          <Tabs.Panel value="accepted">
            <JobsGrid data={acceptedJobs} type="ACCEPTED" />
          </Tabs.Panel>
          <Tabs.Panel value="rejected">
            <JobsGrid data={rejectedJobs} type="REJECTED" />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
};

const JobsGrid = ({ data, type }: { data: any[]; type: string }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
      {data.map((job, i) => (
        <Card
          key={i}
          {...job}
          status={["ACCEPTED", "REJECTED", "INTERVIEWING"].includes(type) ? type : undefined}
          applied={type === "applied"}
          saved={type === "saved"}
          offered={type === "offered"}
        />
      ))}
    </div>
  );
};

export default JobHistory;
