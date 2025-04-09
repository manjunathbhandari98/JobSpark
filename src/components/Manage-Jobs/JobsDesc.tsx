import {
  Badge,
  Tabs,
  useMantineColorScheme,
} from "@mantine/core";
import JobDesc from "../Job-Desc/JobDesc";
import TalentCard from "../Find-Talents/TalentCard";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../../Services/ProfileService";
import { getAllUsers } from "../../Services/UserService";
import { updateApplicantStatus } from "../../Slices/JobSlice";

interface Profile {
  id: number;
  email?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  about?: string;
  picture?: string;
  skills?: string[];
  totalExperience?: number;
}

interface User {
  id: number;
  profileId: number;
  name: string;
  accountType: string;
}

const ApplicantsOverview = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [profileList, setProfileList] = useState<
    Profile[]
  >([]);
  const [offeredProfiles, setOfferedProfiles] =
    useState<Profile[]>([]);
  const [acceptedProfiles, setAcceptedProfiles] =
    useState<Profile[]>([]);
  const [rejectedProfiles, setRejectedProfiles] =
    useState<Profile[]>([]);

  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const fetchProfilesAndUsers = async () => {
      try {
        const usersResponse: User[] =
          await getAllUsers();
        setUsers(usersResponse);

        const profileResponse =
          await getAllProfiles();
        const allProfiles: Profile[] =
          profileResponse.data;

        const applicantProfileIds = new Set(
          usersResponse.map(
            (user) => user.profileId
          )
        );
        const jobApplicants =
          selectedJob?.applicants || [];

        const matchedProfiles: Profile[] =
          allProfiles.filter(
            (profile) =>
              applicantProfileIds.has(
                profile.id
              ) &&
              jobApplicants.find(
                (app: any) =>
                  app.applicantId === profile.id
              )
          );

        const filterByStatus = (status: string) =>
          allProfiles.filter((profile) => {
            const applicant = jobApplicants.find(
              (app: any) =>
                app.applicantId === profile.id &&
                app.applicationStatus === status
            );
            return (
              applicantProfileIds.has(
                profile.id
              ) && applicant
            );
          });

        setProfileList(matchedProfiles);
        setOfferedProfiles(
          filterByStatus("OFFERED")
        );
        setAcceptedProfiles(
          filterByStatus("ACCEPTED")
        );
        setRejectedProfiles(
          filterByStatus("REJECTED")
        );
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      }
    };

    if (selectedJob) {
      fetchProfilesAndUsers();
    }
  }, [selectedJob]);

  const handleStatusChange = (
    profileId: number,
    status: string
  ) => {
    if (!selectedJob) return;
    dispatch(
      updateApplicantStatus({
        jobId: selectedJob.id,
        applicantId: profileId,
        status,
      })
    );
  };

  const renderApplicantList = (
    list: Profile[],
    status?: string
  ) => (
    <div className="py-4 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((applicant, index) => {
        const user = users.find(
          (u) => u.profileId === applicant.id
        );
        return (
          <TalentCard
            key={index}
            {...applicant}
            userName={user?.name || "Unknown"}
            status={status}
            onStatusChange={(newStatus: string) =>
              handleStatusChange(
                applicant.id,
                newStatus
              )
            }
          />
        );
      })}
    </div>
  );

  if (!selectedJob) return <div>Loading...</div>;

  return (
    <div
      className={`w-full rounded-lg px-4 py-5 ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-2xl font-semibold">
            {selectedJob?.jobTitle}
          </div>
          <Badge
            variant="light"
            color={
              selectedJob.jobStatus === "ACTIVE"
                ? "greenTheme.5"
                : selectedJob.jobStatus ===
                  "DRAFT"
                ? "yellow.5"
                : "red.5"
            }
          >
            {selectedJob.jobStatus}
          </Badge>
        </div>
        <div className="text-sm">
          {selectedJob.location}
        </div>
      </div>

      <Tabs
        variant="outline"
        defaultValue="overview"
      >
        <Tabs.List className="[&_button]:text-base [&_button]:font-medium [&_button[data-active='true']]:!text-green-500 flex flex-wrap gap-2">
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
          <Tabs.Tab value="accepted">
            Accepted
          </Tabs.Tab>
          <Tabs.Tab value="rejected">
            Rejected
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value="overview"
          className="mt-5"
        >
          <JobDesc
            edit
            {...selectedJob}
          />
        </Tabs.Panel>

        <Tabs.Panel value="applicants">
          {profileList.length === 0 ? (
            <div className="py-5 text-center text-sm">
              No Applicants Yet
            </div>
          ) : (
            renderApplicantList(profileList)
          )}
        </Tabs.Panel>

        <Tabs.Panel value="invited">
          <div className="py-5 text-center text-sm">
            No Invited Applicants
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="offered">
          {offeredProfiles.length === 0 ? (
            <div className="py-5 text-center text-sm">
              No Offers Yet
            </div>
          ) : (
            renderApplicantList(
              offeredProfiles,
              "OFFERED"
            )
          )}
        </Tabs.Panel>

        <Tabs.Panel value="accepted">
          {acceptedProfiles.length === 0 ? (
            <div className="py-5 text-center text-sm">
              No Accepted Applicants
            </div>
          ) : (
            renderApplicantList(
              acceptedProfiles,
              "ACCEPTED"
            )
          )}
        </Tabs.Panel>

        <Tabs.Panel value="rejected">
          {rejectedProfiles.length === 0 ? (
            <div className="py-5 text-center text-sm">
              No Rejected Applicants
            </div>
          ) : (
            renderApplicantList( 
              rejectedProfiles,
              "REJECTED"
            )
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default ApplicantsOverview;
