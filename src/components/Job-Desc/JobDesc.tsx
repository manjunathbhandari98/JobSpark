import {
  ActionIcon,
  Button,
  Divider,
} from "@mantine/core";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getRelativeTime } from "../../Utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import { removeJob } from "../../Slices/JobSlice";
import ConfirmationPopup from "../../Utils/ConfirmationPopup";
import { useEffect, useState } from "react";

import {     
  IconBriefcase,
  IconMapPin,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { changeProfile } from "../../Slices/ProfileSlice";
import useSavedJob from "../../hooks/useSavedJobs";

const JobDesc = (props:any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] =
    useState(false);
  const user = useSelector(
    (state: any) => state.user
  );

  const handleDelete = () => {
    dispatch(removeJob(props.id));
    setConfirmation(false);
  };

  const handleCancel = () => {
    setConfirmation(false);
  };

  const { toggleSavedJob, savedJobs } =
      useSavedJob();

  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );

  return (
    <div className="w-2/3 py-2 px-3">
      {/* role,company,apply */}
      <div className="flex justify-between py-4">
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
              {selectedJob.company} &bull;{" "}
              Posted{' '}{getRelativeTime(
                selectedJob.postTime
              )}{" "}
              &bull;{" "}
              {selectedJob?.applicants?.length ??
                0}{" "}
              Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
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
              { savedJobs?.includes(
              selectedJob.id
            ) ? (
              <BookmarkCheck onClick={() => toggleSavedJob(selectedJob.id)} className="text-green-500 cursor-pointer" />
            ) : (
              <Bookmark onClick={() => toggleSavedJob(selectedJob.id)} className="cursor-pointer" />
            )}
            </>
          )} 
        </div>
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* location, experience, salary, jobtype */}
      <div className="flex justify-between my-6">
        {/* Location */}
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <ActionIcon
            color="greenTheme.5"
            className="!h-12 !w-12"
            variant="light"
            radius="xl"
            aria-label="settings"
          >
            <IconMapPin
              className="w-4/5 h-4/5"
              stroke={1.3}
            />
          </ActionIcon>
          <div className="text-sm">Location</div>
          <div className="font-medium">
            {selectedJob.location}
          </div>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <ActionIcon
            color="greenTheme.5"
            className="!h-12 !w-12"
            variant="light"
            radius="xl"
            aria-label="settings"
          >
            <IconBriefcase
              className="w-4/5 h-4/5"
              stroke={1.3}
            />
          </ActionIcon>
          <div className="text-sm">
            Experience
          </div>
          <div className="font-medium">
            {selectedJob.experience}
          </div>
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <ActionIcon
            color="greenTheme.5"
            className="!h-12 !w-12"
            variant="light"
            radius="xl"
            aria-label="settings"
          >
            <IconPremiumRights
              className="w-4/5 h-4/5"
              stroke={1.3}
            />
          </ActionIcon>
          <div className="text-sm">Salary</div>
          <div className="font-medium">
            {selectedJob.packageOffered}
          </div>
        </div>

        {/* Job Type */}
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <ActionIcon
            color="greenTheme.5"
            className="!h-12 !w-12"
            variant="light"
            radius="xl"
            aria-label="settings"
          >
            <IconRecharging
              className="w-4/5 h-4/5"
              stroke={1.3}
            />
          </ActionIcon>
          <div className="text-sm">Job Type</div>
          <div className="font-medium">
            {selectedJob.jobType}
          </div>
        </div>
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Required Skills */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          Required Skill
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

      {/* Divider */}
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
          className="space-y-4 text-gray-300 [&>h4]:text-lg [&>h4]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>p]:text-base"
        />
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* About Company */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          About Company
        </div>
        <div className="flex justify-between">
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
        <div>
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
