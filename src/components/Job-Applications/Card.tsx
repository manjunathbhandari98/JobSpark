import {
  Bookmark,
  BookmarkCheck,
  Clock,
} from "lucide-react";
import {
  Badge,
  Button,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../Utils/dateUtils";
import useSavedJob from "../../hooks/useSavedJobs";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { editJob } from "../../Slices/JobSlice";
import { updateJob } from "../../Services/JobService";
import { notifications } from "@mantine/notifications";

const Card = (data: any) => {
  const { toggleSavedJob, savedJobs } =
    useSavedJob();
  const user = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch();

  const handleJobAccept = async() => {
    const updatedApplicants = data.applicants.map(
      (applicant: any) =>
        applicant.applicantId === user.id
          ? {
              ...applicant, 
              applicationStatus: "ACCEPTED",
            }
          : applicant
    );
    try {
       const response = await updateJob(data.id, {
      ...data,
      applicants: updatedApplicants,
    })
    dispatch(
      editJob(response.data)
    );
    notifications.show({
      title: "Job Accepted",
      message: "You have accepted the job offer.",
      color: "green",
      autoClose: 2000,
    });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to accept the job offer.",
        color: "red",
        autoClose: 2000,
      });
      console.error("Error accepting job:", error);
    }
    
  };

  const handleJobReject = async() => {
    const updatedApplicants = data.applicants.map(
      (applicant: any) =>
        applicant.applicantId === user.id
          ? {
              ...applicant,
              applicationStatus: "REJECTED",
            }
          : applicant
    );
   try {
     const response = await updateJob(data.id, {
       ...data,
       applicants: updatedApplicants,
     });
     dispatch(editJob(response.data));
     notifications.show({
       title: "Job Accepted",
       message:
         "You have accepted the job offer.",
       color: "green",
       autoClose: 2000,
     });
   } catch (error) {
     notifications.show({
       title: "Error",
       message: "Failed to accept the job offer.",
       color: "red",
       autoClose: 2000,
     });
     console.error("Error accepting job:", error);
   }
  };

  const applicant = Array.isArray(data.applicants)
    ? data.applicants.find(
        (a: any) => a.applicantId === user.id
      )
    : null;

  const status =
    data.status || applicant?.applicationStatus;

  const renderStatusBadge = () => {
    if (!status) return null;
    const color =
      status === "ACCEPTED"
        ? "greenTheme.5"
        : "red.8";
    const label =
      status === "ACCEPTED"
        ? "Accepted"
        : "Rejected";

    return (
      <Badge
        color={color}
        variant="filled"
        fullWidth
        size="xl"
        radius="md"
        className="font-bold text-sm tracking-wide text-center"
      >
        {label}
      </Badge>
    );
  };


         const { colorScheme } = useMantineColorScheme(); 
          const isDark = colorScheme === "dark";
 
  return (
    <div className="gap-5">
      <div
        className={`${
          isDark
            ? "bg-gray-900 text-gray-200"
            : "bg-gray-100 text-black"
        } rounded-xl gap-3 p-4 hover:shadow-[0_0_5px_1px_green] !shadow-green-500`}
      >
        {" "}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
          <div className="flex gap-2">
            <div className="bg-gray-800 p-2 rounded-xl">
              <img
                src={`/Icons/${data.company}.png`}
                alt={data.company}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-semibold truncate max-w-[20ch] sm:max-w-[14ch]">
                {data.jobTitle}
              </div>
              <div className="text-sm ">
                {data.company} ·{" "}
                {Array.isArray(data.applicants)
                  ? data.applicants.length
                  : 0}{" "}
                Applicants
              </div>
            </div>
          </div>
          <div className="self-end sm:self-center">
            {savedJobs?.includes(data.id) ? (
              <BookmarkCheck
                onClick={() =>
                  toggleSavedJob(data.id)
                }
                className="text-green-500 cursor-pointer"
              />
            ) : (
              <Bookmark
                onClick={() =>
                  toggleSavedJob(data.id)
                }
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-start py-4">
          {[
            data.experience,
            data.jobType,
            data.location,
          ].map((item, index) => (
            <div
              key={index}
              className={`text-sm ${
                    isDark
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-300 text-black"
                  } py-1 px-2 rounded-lg`}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Description */}
        <div className="text-sm  line-clamp-3 mb-2">
          {data.about}
        </div>
        <Divider
          size="xs"
          className="my-3"
          color="white"
        />
        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
          <div className="text-lg font-bold ">
            ₹{data.packageOffered}
          </div>
          <div className="flex gap-2 items-center text-sm ">
            <Clock size={18} />
            {data.applied
              ? `Applied ${getRelativeTime(
                  data.appliedTime
                )}`
              : data.saved
              ? "Saved"
              : data.offered
              ? "Interviewed"
              : "Posted"}
          </div>
        </div>
        {/* CTA / Status */}
        <div className="mt-4">
          {status === "ACCEPTED" ||
          status === "REJECTED" ? (
            renderStatusBadge()
          ) : data.offered ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                color="greenTheme.5"
                variant="outline"
                fullWidth
                onClick={handleJobAccept}
              >
                Accept
              </Button>
              <Button
                color="red.7"
                variant="outline"
                fullWidth
                onClick={handleJobReject}
              >
                Reject
              </Button>
            </div>
          ) : (
            <Link to="/job">
              <Button
                fullWidth
                className="cursor-pointer"
              >
                View Job
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
