import { Bookmark, Clock } from "lucide-react";
import { Divider } from "@mantine/core";
import { Link } from "react-router-dom";

const JobCard = (data: any) => {
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
                {data.company} . {data.applicants}{" "}
                Applicants
              </div>
            </div>
          </div>

          <div className="cursor-pointer">
            <Bookmark />
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
              className=" text-sm shadow-2xl bg-gray-700 py-1 px-2 rounded-lg"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="text-sm line-clamp-3">
          {data.description}
        </div>

        <Divider
          size="xs"
          className="my-3"
          color="white"
        />
        {/* Salary & Posted on */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            ₹{data.package}
          </div>
          <div className="flex gap-2">
            <Clock size={18} />
            <div className="text-sm">
              Posted {data.postedDaysAgo} Days ago
            </div>
          </div>
        </div>

        {/* View Jobs Button */}
        <div className="my-3 px-4 bg-green-500/8 text-center py-2 text-green-500 rounded-lg font-bold cursor-pointer">
          <Link to="/job">
            <button className="cursor-pointer">
              View Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
