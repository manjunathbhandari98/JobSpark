import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../Utils/dateUtils";
import useSavedJob from "../../hooks/useSavedJobs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editJob } from "../../Slices/JobSlice";

const Card = (data: any) => {

  const { toggleSavedJob, savedJobs } =
    useSavedJob();
  const user = useSelector((state:any) => state.user);

  const dispatch = useDispatch();

 const handleJobAccept = () => {
   const updatedApplicants = data.applicants.map(
     (applicant: any) =>
       applicant.applicantId === user.id
         ? {
             ...applicant,
             applicationStatus: "ACCEPTED",
           }
         : applicant
   );

   const updatedData = {
     ...data,
     applicants: updatedApplicants, // Correctly updating the applicants array
   };
   dispatch(editJob(updatedData))
 };

  const handleJobReject = () => {
    const updatedApplicants = data.applicants.map(
      (applicant: any) =>
        applicant.applicantId === user.id
          ? {
              ...applicant,
              applicationStatus: "REJECTED",
            }
          : applicant
    );

    const updatedData = {
      ...data,
      applicants: updatedApplicants,
    };

    dispatch(editJob(updatedData));
  };

  const applicant = Array.isArray(data.applicants)
    ? data.applicants.find(
        (a: any) => a.applicantId === user.id
      )
    : null;


  return (
    <div className="gap-5">
      <div className="bg-gray-900 rounded-xl gap-3 p-4 hover:shadow-[0_0_5px_1px_green] !shadow-green-500">
        {/* logo, role, bookmark */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="bg-gray-800 p-2 rounded-xl">
              <img
                src={`/Icons/${data.company}.png`}
                alt={data.company}
                className="h-10"
              />
            </div>
            <div>
              <div className="text-xl font-semibold truncate max-w-[14ch] overflow-hidden whitespace-nowrap">
                {data.jobTitle}
              </div>
              <div className="text-sm">
                {data.company} .{" "}
                {Array.isArray(data.applicants)
                  ? data.applicants.length
                  : 0}{" "}
                Applicants
              </div>
            </div>
          </div>

          <div className="cursor-pointer">
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
        {/* experience, type, location */}
        <div className="flex justify-between py-4">
          {[
            data.experience,
            data.jobType,
            data.location,
          ].map((item, index) => (
            <div
              key={index}
              className="text-sm shadow-2xl bg-gray-700 py-1 px-2 rounded-lg"
            >
              {item}
            </div>
          ))}
        </div>
        {/* Details */}
        <div className="text-sm line-clamp-3">
          {data.about}
        </div>
        <Divider
          size="xs"
          className="my-3"
          color="white"
        />
        {/* Salary & Posted on */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            ₹{data.packageOffered}
          </div>
          <div className="flex gap-2">
            <Clock size={18} />
            <div className="text-sm">
              {data.applied
                ? `Applied ${getRelativeTime(
                    data.appliedTime
                  )}`
                : data.saved
                ? "Saved"
                : data.offered
                ? "Interviewed"
                : "Posted"}{" "}
            </div>
          </div>
        </div>
        {/* View Jobs Button */}
        <div className="my-3 px-4 text-center py-2 text-green-500 rounded-lg font-bold cursor-pointer">
          {data.offered ? (
            applicant ? (
              applicant.applicationStatus ===
              "ACCEPTED" ? (
                <Button
                  fullWidth
                  color="greenTheme.5"
                  variant="outline"
                >
                  Accepted
                </Button>
              ) : applicant.applicationStatus ===
                "REJECTED" ? (
                <Button
                  fullWidth
                  color="red.7"
                  variant="outline"
                >
                  Rejected
                </Button>
              ) : (
                <div className="flex gap-3">
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
              )
            ) : (
              // If the applicant is null (not found), still show buttons
              <div className="flex gap-3">
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
            )
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
