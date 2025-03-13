import {
  Bookmark,
  Dot,
  MapPin,
} from "lucide-react";
import { Divider } from "@mantine/core";
import { Link } from "react-router-dom";

const TalentCard = (data: any) => {
  return (
    <div className="gap-4">
      <div className="bg-gray-900 rounded-xl gap-3 p-4 hover:shadow-[0_0_5px_1px_green] !shadow-green-500">
        {/* Profile, role, company */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-gray-800 p-1 rounded-full h-16 flex items-center">
              <img
                src={`/${data.image}.png`}
                alt={data.image}
                className="h-15 rounded-full"
              />
            </div>
            <div>
              <div className="text-xl font-semibold truncate max-w-[14ch] overflow-hidden whitespace-nowrap">
                {data.name}
              </div>
              <div className="text-sm flex">
                {data.role} <Dot /> {data.company}
              </div>
            </div>
          </div>

          <div className="cursor-pointer">
            <Bookmark />
          </div>
        </div>

        {/* Skills */}
        <div className="flex gap-3 py-4 flex-wrap">
          {data.topSkills.map(
            (item: any, index: number) => (
              <div
                key={index}
                className="text-sm shadow-2xl bg-gray-700 py-1 px-2 rounded-lg"
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* About */}
        <div className="text-sm line-clamp-3">
          {data.about}
        </div>

        <Divider
          size="xs"
          className="my-3"
        />

        {/* Salary & location */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            Exc: {data.expectedCtc}
          </div>
          <div className="flex gap-2">
            <MapPin size={18} />
            <div className="text-sm">
              {data.location.split(",")[0]}
            </div>
          </div>
        </div>

        <Divider
          size="xs"
          className="my-2"
        />

        {/* Buttons */}
        <div className="px-4 my-3 flex gap-3 [&>*]:w-1/2 [&>*]:py-2 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:font-bold [&>*]:text-green-500 [&>*]:text-center">
          <div className="border border-green-500">
            <Link to="/talent-profile">
              <button className="cursor-pointer">
                Profile
              </button>
            </Link>
          </div>
          <div className="bg-green-500/8">
            <button className="cursor-pointer">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
