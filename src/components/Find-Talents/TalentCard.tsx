import {
  Button,
  Divider,
  Modal,
  useMantineColorScheme,
} from "@mantine/core";
import {
  DateInput,
  TimeInput,
} from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import {
  Bookmark,
  Calendar,
  Dot,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateJob } from "../../Services/JobService";
import { editJob } from "../../Slices/JobSlice";

interface TalentCardProps {
  id?: number;
  name?: string;
  title?: string;
  skills?: string[];
  location?: string;
  experience?: number;
  createdAt?: string;
  about?: string;
  picture?: string;
  totalExperience?: number;
  invite?: boolean;
  manage?: boolean;
  jobTitle?: string;
  company?: string;
  userName?: string;
  status?: string;
  onStatusChange?: (
    status:
      | "OFFERED"
      | "ACCEPTED"
      | "REJECTED"
      | "INTERVIEWING"
  ) => void;
}

const TalentCard = (data: TalentCardProps) => {
  const imageSource = data?.picture;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedJob = useSelector(
    (state: any) => state.job?.selectedJob
  );
const { colorScheme } = useMantineColorScheme(); 
    const isDark = colorScheme === "dark";
  const [opened, { open, close }] =
    useDisclosure(false);
  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);
  const [selectedTime, setSelectedTime] =
    useState<string | null>(null);

  const handleProfile = () => {
    if (data?.id) {
      navigate(`/talent-profile/${data?.id}`);
    }
  };

  const handleSchedule = async () => {
    if (
      selectedDate &&
      selectedTime &&
      selectedJob
    ) {
      const [hours, minutes] = selectedTime
        .split(":")
        .map(Number);
      const combined = dayjs(selectedDate)
        .set("hour", hours || 0)
        .set("minute", minutes || 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toISOString();

      const updatedApplicants =
        selectedJob?.applicants?.map(
          (applicant: any) => {
            if (
              applicant?.applicantId === data?.id
            ) {
              return {
                ...applicant,
                interviewTime: combined,
                applicationStatus: "INTERVIEWING",
              };
            }
            return applicant;
          }
        );

      const updatedJob = {
        ...selectedJob,
        applicants: updatedApplicants,
      };
      console.log("Updated Job: ", updatedJob);
      const response = await updateJob(
        selectedJob.id,
        updatedJob
      );
      dispatch(editJob(response.data));
      data?.onStatusChange?.("INTERVIEWING");
      close();
    }
  };

  const updateApplicantStatus = async (
    newStatus: "OFFERED" | "REJECTED"
  ) => {
    if (!selectedJob || !data?.id) return;

    const updatedApplicants =
      selectedJob?.applicants?.map(
        (applicant: any) => {
          if (
            applicant?.applicantId === data.id
          ) {
            return {
              ...applicant,
              applicationStatus: newStatus,
            };
          }
          return applicant;
        }
      );

    const updatedJob = {
      ...selectedJob,
      applicants: updatedApplicants,
    };
    const response = await updateJob(
      selectedJob.id,
      updatedJob
    );
    dispatch(editJob(response.data));
    data?.onStatusChange?.(newStatus);
  };

  const currentApplicant =
    selectedJob?.applicants?.find(
      (applicant: any) =>
        applicant?.applicantId === data?.id
    );

  const currentStatus =
    currentApplicant?.applicationStatus ??
    "APPLIED";

  return (
    <div className="gap-5 h-full">
      <div
        className={`${
          isDark
            ? "bg-gray-900 text-gray-200"
            : "bg-gray-100 text-black"
        } rounded-xl gap-3 p-4 h-full hover:shadow-[0_0_5px_1px_green] !shadow-green-500`}
      >
        {/* Top Info */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div
              className={` ${
                isDark
                  ? "bg-gray-800"
                  : "bg-gray-200"
              } p-1 rounded-full h-16 flex items-center`}
            >
              <img
                src={imageSource}
                alt="profile"
                className="h-15 w-15 rounded-full"
              />
            </div>
            <div>
              <div className="text-xl font-semibold truncate max-w-[14ch] overflow-hidden whitespace-nowrap">
                {data?.userName ||
                  data?.name ||
                  "Unknown"}
              </div>
              <div className="text-sm flex">
                {data?.jobTitle ?? "Unknown"}{" "}
                <Dot />{" "}
                {data?.company ?? "Unknown"}
              </div>
            </div>
          </div>
          <div className="cursor-pointer">
            <Bookmark />
          </div>
        </div>

        {/* Skills */}
        <div className="flex gap-3 py-4 flex-wrap">
          {Array.isArray(data?.skills) &&
          data.skills.length > 0 ? (
            data.skills.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className={`text-sm shadow-2xl ${
                    isDark
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  } py-1 px-2 rounded-lg`}
                >
                  {item}
                </div>
              )
            )
          ) : (
            <div className="text-sm text-gray-400">
              No skills listed
            </div>
          )}
        </div>

        {/* About */}
        <div className="text-sm line-clamp-3">
          {data?.about ?? "No description"}
        </div>

        <Divider
          size="xs"
          className="my-3"
        />

        {/* Experience or Interview Info */}
        {data?.invite ? (
          <div className="flex gap-2 items-center">
            <Calendar size={18} /> Interview: 12
            August 2025 10:30 AM
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">
              Exp: {data?.totalExperience ?? 0}
            </div>
            <div className="flex gap-2">
              <MapPin size={18} />
              <div className="text-sm">
                {data?.location ?? "N/A"}
              </div>
            </div>
          </div>
        )}

        <Divider
          size="xs"
          className="my-2"
        />

        {/* Action Buttons */}
        <div className="px-4 my-3 flex gap-3 [&>*]:w-1/2 [&>*]:py-2 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:font-bold [&>*]:text-green-500 [&>*]:text-center">
          {[
            "OFFERED",
            "REJECTED",
            "ACCEPTED",
          ].includes(currentStatus) ? (
            <div
              className={`flex justify-center mx-auto items-center font-bold w-full text-center ${
                currentStatus === "OFFERED"
                  ? "text-green-500"
                  : currentStatus === "REJECTED"
                  ? "text-red-500"
                  : "text-blue-500"
              }`}
            >
              Status:{" "}
              {currentStatus
                .charAt(0)
                .toUpperCase() +
                currentStatus
                  .slice(1)
                  .toLowerCase()}
            </div>
          ) : data?.invite ? (
            <>
              <Button
                color="greenTheme.5"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
              <Button
                color="red.7"
                variant="outline"
                fullWidth
              >
                Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                color="greenTheme.5"
                variant="outline"
                fullWidth
                onClick={handleProfile}
              >
                Profile
              </Button>
              {data?.manage || !data?.status ? (
                currentStatus ===
                "INTERVIEWING" ? (
                  <>
                    <Button
                      color="greenTheme.5"
                      variant="outline"
                      fullWidth
                      onClick={() =>
                        updateApplicantStatus(
                          "OFFERED"
                        )
                      }
                    >
                      Offer
                    </Button>
                    <Button
                      color="red.7"
                      variant="outline"
                      fullWidth
                      onClick={() =>
                        updateApplicantStatus(
                          "REJECTED"
                        )
                      }
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button
                    color="greenTheme.5"
                    variant="light"
                    fullWidth
                    rightSection={
                      <Calendar size={18} />
                    }
                    onClick={open}
                  >
                    Schedule
                  </Button>
                )
              ) : (
                <Button
                  color="greenTheme.5"
                  variant="light"
                  fullWidth
                  onClick={() =>
                    navigate("/message")
                  }
                >
                  Message
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
        overlayProps={{
          blur: 3,
          backgroundOpacity: 0.4,
        }}
      >
        <div className="space-y-4">
          <DateInput
            minDate={new Date()}
            value={selectedDate}
            onChange={setSelectedDate}
            label="Interview Date"
            placeholder="Choose a date"
            className="w-full"
          />
          <TimeInput
            label="Interview Time"
            value={selectedTime ?? ""}
            onChange={(event) =>
              setSelectedTime(
                event?.currentTarget?.value ?? ""
              )
            }
            className="w-full"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="default"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              color="greenTheme.5"
              onClick={handleSchedule}
              disabled={
                !selectedDate || !selectedTime
              }
            >
              Schedule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
