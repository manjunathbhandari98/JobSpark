import {
  ActionIcon,
  Button,
  Divider,
} from "@mantine/core";
import {
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { getRelativeTime } from "../../Utils/dateUtils";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { removeJob } from "../../Slices/JobSlice";
import ConfirmationPopup from "../../Utils/ConfirmationPopup";
import { useState } from "react";

import {
  IconBriefcase,
  IconMapPin,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";
import useSavedJob from "../../hooks/useSavedJobs";

const JobDesc = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] =
    useState(false);
  const user = useSelector(
    (state: any) => state.user
  );
  const { toggleSavedJob, savedJobs } =
    useSavedJob();
  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );

  const handleDelete = () => {
    dispatch(removeJob(props.id));
    setConfirmation(false);
  };

  const handleCancel = () => {
    setConfirmation(false);
  };

  return (
    <div className="w-full max-w-full overflow-hidden px-3 sm:px-4 lg:px-6">
      {/* role, company, apply */}
      <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-700 rounded-xl p-2">
            <img
              src={`/Icons/${selectedJob.company}.png`}
              alt="logo"
              className="h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-xl">
              {selectedJob.jobTitle}
            </div>
            <div className="text-sm">
              {selectedJob.company} &bull; Posted{" "}
              {getRelativeTime(
                selectedJob.postTime
              )}{" "}
              &bull;{" "}
              {selectedJob?.applicants?.length ??
                0}{" "}
              Applicants
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:flex-col items-start md:items-center">
          {props.edit ? (
            <>
              <Link to="/edit-job">
                <Button
                  size="sm"
                  variant="light"
                  color="greenTheme.5"
                >
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                color="red.5"
                onClick={() =>
                  setConfirmation(true)
                }
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Link to="/job-apply">
                <Button
                  size="sm"
                  variant="light"
                  color="greenTheme.5"
                  disabled={
                    selectedJob?.applicants?.find(
                      (applicant: any) =>
                        applicant.applicantId ===
                        user.id
                    )
                      ? true
                      : false
                  }
                >
                  {selectedJob?.applicants?.find(
                    (applicant: any) =>
                      applicant.applicantId ===
                      user.id
                  )
                    ? "Applied"
                    : "Apply"}
                </Button>
              </Link>
              {savedJobs?.includes(
                selectedJob.id
              ) ? (
                <BookmarkCheck
                  onClick={() =>
                    toggleSavedJob(selectedJob.id)
                  }
                  className="text-green-500 cursor-pointer"
                />
              ) : (
                <Bookmark
                  onClick={() =>
                    toggleSavedJob(selectedJob.id)
                  }
                  className="cursor-pointer"
                />
              )}
            </>
          )}
        </div>
      </div>

      <Divider size="xs" />

      {/* location, experience, salary, jobtype */}
      <div className="flex flex-wrap justify-between gap-y-6 my-6">
        {[
          {
            icon: IconMapPin,
            label: "Location",
            value: selectedJob.location,
          },
          {
            icon: IconBriefcase,
            label: "Experience",
            value: selectedJob.experience,
          },
          {
            icon: IconPremiumRights,
            label: "Salary",
            value: selectedJob.packageOffered,
          },
          {
            icon: IconRecharging,
            label: "Job Type",
            value: selectedJob.jobType,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-1/2 sm:w-1/2 md:w-1/4 flex flex-col gap-2 items-center justify-center text-center"
          >
            <ActionIcon
              color="greenTheme.5"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label={item.label}
            >
              <item.icon
                className="w-4/5 h-4/5"
                stroke={1.3}
              />
            </ActionIcon>
            <div className="text-sm">
              {item.label}
            </div>
            <div className="font-medium">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <Divider size="xs" />

      {/* Required Skills */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          Required Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedJob.skillsRequired?.map(
            (skill: any, index: number) => (
              <div
                key={index}
                className="bg-green-500/8 text-green-500 px-2 py-1 rounded-full"
              >
                {skill}
              </div>
            )
          )}
        </div>
      </div>

      <Divider size="xs" />

      {/* About Job */}
      <div className="py-4 flex flex-col gap-3">
        <div className="text-2xl font-semibold">
          About Job
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: selectedJob.description,
          }}
          className="space-y-4  [&>h4]:text-lg [&>h4]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>p]:text-base"
        />
      </div>

      <Divider size="xs" />

      {/* About Company */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          About Company
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-700 rounded-xl p-2">
              <img
                src="/Icons/Google.png"
                alt="logo"
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-lg">
                Google
              </div>
              <div className="text-sm">
                10k+ Employees
              </div>
            </div>
          </div>
          <div>
            <Button
              size="sm"
              variant="light"
              color="greenTheme.5"
              onClick={() => navigate("/company")}
            >
              Company Page
            </Button>
          </div>
        </div>
        <div className="text-sm leading-relaxed ">
          Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Natus maiores possimus
          fuga nulla deleniti assumenda hic neque
          debitis, quia enim corrupti accusamus
          suscipit distinctio, aspernatur
          laboriosam consequatur voluptatibus
          repudiandae cupiditate, rerum illum
          reprehenderit accusantium necessitatibus
          explicabo. Ad doloremque dolorem,
          consequuntur cum ab architecto rem
          optio.
        </div>
      </div>

      {confirmation && (
        <ConfirmationPopup
          question="Do you want to delete this Job?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default JobDesc;
