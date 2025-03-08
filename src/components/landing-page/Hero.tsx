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
import Google from "../../assets/Icons/Google.png";

const Hero = () => {
  return (
    <div className="flex w-full justify-center items-center px-20">
      {/* Left Side */}
      <div className="space-y-4 w-[45%]">
        {/* Header */}

        <div className="font-bold text-6xl gap-5 leading-tight [&>span]:text-green-500">
          Your <span>Journey</span> to the{" "}
          <span>Perfect Job</span> Starts Here
        </div>

        {/* tagline */}

        <div className="text-xl font-semibold">
          <span>
            Find Opportunities That Align with
            Your Goals and Create
          </span>{" "}
          <span className="mt-4">
            a Life You Love.
          </span>
        </div>

        {/* Search bar */}
        <div>
          <div className="flex pt-5 gap-4 w-full">
            <TextInput
              className="bg-gray-900 p-2 rounded-xl text-white font-semibold [&_input]:!text-white"
              label="Job Title"
              variant="unstyled"
              placeholder="Software Developer"
            />
            <TextInput
              className="bg-gray-900 p-2 rounded-xl text-white font-semibold [&_input]:!text-white"
              label="Job Type"
              variant="unstyled"
              placeholder="Fulltime"
            />
            <button className="bg-green-500 p-4 cursor-pointer rounded-xl hover:bg-green-600">
              <Search size={50} />
            </button>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-[60%] flex items-center justify-center">
        {/* Illustration Image */}

        <div className="w-[30rem] relative">
          <img
            src={Illustration}
            alt="illustration"
          />
          <div className="w-fit absolute top-[30%] -left-10 border-green-400 border rounded-lg p-3 backdrop-blur-md">
            <div className="text-sm flex gap-2 items-center">
              <div className="google bg-gray-900 p-2 rounded-lg">
                <img
                  src={Google}
                  alt="google"
                  height={20}
                  width={20}
                />
              </div>
              <div className="flex flex-col">
                <div className="role text-md font-semibold">
                  Software Engineer
                </div>
                <div className="location">
                  Bengaluru
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 p-1 text-sm mt-2">
              <div>1 day ago</div>
              <div>100+ Applicants</div>
            </div>
          </div>
          <div className="w-fit absolute top-[50%] -right-10 border-green-400 border rounded-lg p-3 backdrop-blur-md">
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
