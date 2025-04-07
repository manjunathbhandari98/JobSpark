import { Bookmark, Clock, BookmarkCheck } from "lucide-react";
import { Divider,Button, Tooltip } from "@mantine/core";
import {useNavigate } from "react-router-dom";
import {getRelativeTime} from '../../Utils/dateUtils'
import {useDispatch} from "react-redux";
import { setJob } from "../../Slices/JobSlice";
import useSavedJob from "../../hooks/useSavedJobs";

const JobCard = (data: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () =>{ 
    navigate('/job');
    dispatch(setJob(data))
  }

  const { toggleSavedJob, savedJobs } =
      useSavedJob();

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
                {data.company} •{" "}
                {Array.isArray(data.applicants)
                  ? data.applicants.length
                  : 0}{" "}
                Applicants
              </div>
            </div>
          </div>

          <div
            className="cursor-pointer"
            onClick={() =>
              toggleSavedJob(data.id)
            }
          >
            {savedJobs?.includes(data.id) ? (
              <BookmarkCheck className="text-green-500" />
            ) : (
              <Bookmark />
            )}{" "}
          </div>
        </div>
        {/* experience, type, location */}
        <div className="flex justify-between py-4">
          {[
            data.experience,
            data.jobType,
            data.location,
          ].map((item, index) => {
            // Ensure item is a string
            const text = String(item || "");

            // Split text into words
            const words = text.split(/\s+/);

            // Truncate text to 6 words max, adding "..." if it's longer
            const truncatedText =
              words.length > 6
                ? words.slice(0, 6).join(" ") +
                  "..."
                : text;

            return (
              <Tooltip
                key={index}
                label={text}
                withArrow
              >
                <div className="text-sm shadow-2xl bg-gray-700 py-1 px-2 rounded-lg cursor-pointer max-w-[200px] truncate">
                  {truncatedText}
                </div>
              </Tooltip>
            );
          })}
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
              Posted{" "}
              {getRelativeTime(data.postTime)}
            </div>
          </div>
        </div>
        {/* View Jobs Button */}
        <div className="my-3 font-bold">
          <Button
            variant="filled"
            fullWidth
            onClick={handleNavigate}
          >
            View Job
          </Button>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
