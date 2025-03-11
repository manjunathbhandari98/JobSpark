import Illustration from "../../assets/Images/Girl.png";
import { work } from "../../data/Data";
import avatar from "../../assets/Images/avatar.png";

const WorkFlow = () => {
  return (
    <div className="py-16 px-6 mt-20 md:px-16">
      {/* Heading Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold [&>span]:text-green-500">
          How It <span>Works</span>
        </h2>
        <p className="text-xl text-gray-300 mt-2">
          Effortlessly navigate through the
          process and land your dream job.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-10">
        {/* Left - Illustration */}
        <div className="md:w-1/2 relative flex justify-center">
          <img
            src={Illustration}
            alt="illustration"
            className="w-[20rem] md:w-[30rem]"
          />
          <div className="right-15 top-[10%] w-[9rem] absolute border-green-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-sm flex flex-col text-center gap-2 items-center">
              <div className="p-2">
                <img
                  src={avatar}
                  alt="google"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md font-semibold">
                  Complete Your Profile
                </div>
                <div className="text-sm text-gray-300">
                  70% completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Steps */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Step 1 */}
          {work.map((w, index) => (
            <div
              key={index}
              className="flex items-center gap-5 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="bg-green-500 rounded-full p-4 shadow-lg hover:scale-105 transition-transform">
                <img
                  src={`/WorkFlow/${w.icon}.png`}
                  alt="resume"
                  className="h-9 w-9"
                />
              </div>
              {/* Text */}
              <div>
                <h3 className="text-2xl font-semibold">
                  {w.name}
                </h3>
                <p className="text-gray-300 text-lg">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
