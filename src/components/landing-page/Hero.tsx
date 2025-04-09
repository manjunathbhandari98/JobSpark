import {
  Avatar,
  AvatarGroup,
  TextInput,
} from "@mantine/core";
import Illustration from "../../assets/Images/Boy.png";
import avatar from "../../assets/Images/avatar.png";
import avatar1 from "../../assets/Images/avatar1.png";
import avatar2 from "../../assets/Images/avatar2.png";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center px-4 md:px-20 py-10 gap-10">
      {/* Left Side */}
      <div className="space-y-6 w-full md:w-[50%]">
        {/* Header */}
        <div className="font-bold text-4xl md:text-6xl leading-tight [&>span]:text-green-500">
          Your <span>Journey</span> to the{" "}
          <span>Perfect Job</span> Starts Here
        </div>

        {/* tagline */}
        <div className="text-base md:text-xl font-semibold">
          <span>
            Find Opportunities That Align with
            Your Goals and Create
          </span>{" "}
          <span className="block mt-2">
            a Life You Love.
          </span>
        </div>

        {/* Search bar */}
        <div>
          <div className="flex flex-col sm:flex-row pt-5 gap-4 w-full">
            <TextInput
              className="p-2 rounded-xl border font-semibold  flex-1"
              label="Job Title"
              variant="unstyled"
              placeholder="Software Developer"
            />
            <TextInput
              className="p-2 rounded-xl border font-semibold  flex-1"
              label="Job Type"
              variant="unstyled"
              placeholder="Fulltime"
            />
            <button className="bg-green-500 p-4 rounded-xl hover:bg-green-600 flex items-center justify-center text-white font-semibold">
              {/* Icon for medium and up */}
              <Search
                size={30}
                className="hidden sm:block"
              />

              {/* Text for small screens */}
              <span className="block sm:hidden text-sm">
                SEARCH
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full p-4 md:w-[50%] flex items-center justify-center">
        <div className="w-full max-w-md relative">
          <img
            src={Illustration}
            alt="illustration"
            className="w-full h-auto"
          />

          {/* Left popup */}
          <div className="absolute  top-[30%] -left-6 sm:-left-12 border-green-400 border rounded-lg p-3 backdrop-blur-md bg-white/10">
            <div className="text-sm flex gap-2 items-center">
              <div className="google bg-gray-900 p-2 rounded-lg">
                <img
                  src="/Icons/Google.png"
                  alt="google"
                  height={20}
                  width={20}
                />
              </div>
              <div className="flex flex-col text-white">
                <div className="role text-md font-semibold">
                  Software Engineer
                </div>
                <div className="location text-sm">
                  Bengaluru
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 p-1 text-sm mt-2 text-white">
              <div>1 day ago</div>
              <div>100+ Applicants</div>
            </div>
          </div>

          {/* Right popup */}
          <div className="absolute top-[55%] -right-6 sm:-right-10 border-green-400 border rounded-lg p-3 backdrop-blur-md bg-white/10">
            <div className="text-center text-gray-100 mb-1 font-semibold text-md">
              10K+ got job
            </div>
            <AvatarGroup>
              <Avatar src={avatar} />
              <Avatar src={avatar1} />
              <Avatar src={avatar2} />
              <Avatar>9K+</Avatar>
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
