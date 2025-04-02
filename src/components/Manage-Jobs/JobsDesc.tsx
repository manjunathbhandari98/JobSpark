import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../Job-Desc/JobDesc";
import { talents } from "../../data/TalentData";
import TalentCard from "../Find-Talents/TalentCard";
import {
  useSelector,
} from "react-redux";

const ApplicantsOverview = () => {
  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );

  if (!selectedJob) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 px-3 w-full">
      {/* Job Title & Status */}
      <div className="flex flex-col ml-7 gap-2">
        <div className="flex gap-4">
          <div className="font-semibold text-2xl">
            {selectedJob?.jobTitle}
          </div>
          <div>
            <Badge
              variant="light"
              color={`${
                selectedJob.jobStatus === "ACTIVE"
                  ? "greenTheme.5"
                  : selectedJob.jobStatus ===
                    "DRAFT"
                  ? "yellow.5"
                  : "red.5"
              }`}
            >
              {selectedJob.jobStatus}
            </Badge>
          </div>
        </div>
        <div>{selectedJob.location}</div>
      </div>

      {/* Tabs */}
      <div className="py-4 mt-4 px-7">
        <Tabs
          variant="outline"
          defaultValue="overview"
        >
          <Tabs.List className="[&_button]:!text-xl  [&_button]:!font-semibold [&_button[data-active='true']]:!text-green-500">
            <Tabs.Tab value="overview">
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="applicants">
              Applicants
            </Tabs.Tab>
            <Tabs.Tab value="invited">
              Invited
            </Tabs.Tab>
            <Tabs.Tab value="offered">
              Offered
            </Tabs.Tab>
            <Tabs.Tab value="rejected">
              Rejected
            </Tabs.Tab>
          </Tabs.List>

          {/* Panels */}
          <Tabs.Panel
            value="overview"
            className="[&>div]:w-full"
          >
            <JobDesc
              edit
              {...selectedJob}
            />
          </Tabs.Panel>
          <Tabs.Panel value="applicants">
            {(selectedJob?.applicants?.length ?? 0) < 1 ? 
 
            <div className = 'flex py-5'>
              No Applicants Yet
            </div> : 
            <div className="py-4 mt-5 grid grid-cols-2 gap-6 ">
              {selectedJob.applicants?.map(
                (data:any, index:number) =>
                  index < 4 && (
                    <TalentCard
                      key={index}
                      {...data}
                      manage
                    />
                  )
              )}
            </div>}
          </Tabs.Panel>
          <Tabs.Panel value="invited">
            <div className="py-4 mt-5 grid grid-cols-2 gap-6 ">
              {talents.map(
                (data, index) =>
                  index < 4 && (
                    <TalentCard
                      key={index}
                      {...data}
                      invite
                    />
                  )
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            Offered
          </Tabs.Panel>
          <Tabs.Panel value="rejected">
            Rejected
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicantsOverview;
