import Illustration from "../../assets/Images/Girl.png";
import { work } from "../../data/Data";
import avatar from "../../assets/Images/avatar.png";

const WorkFlow = () => {
  return (
    <div className="py-16 px-4 sm:px-8 md:px-16 mt-20">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold [&>span]:text-green-500">
          How It <span>Works</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-2">
          Effortlessly navigate through the
          process and land your dream job.
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-10">
        {/* Illustration */}
        <div className="md:w-1/2 relative flex justify-center">
          <img
            src={Illustration}
            alt="illustration"
            className="w-[16rem] sm:w-[22rem] md:w-[28rem]"
          />
          <div className="absolute top-[10%] -right-4 sm:-right-8 md:-right-12 w-36 sm:w-40 border-green-400 border rounded-lg p-2 backdrop-blur-md shadow-md">
            <div className="text-sm flex flex-col text-center gap-2 items-center">
              <img
                src={avatar}
                alt="avatar"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
              />
              <div>
                <div className="font-semibold">
                  Complete Your Profile
                </div>
                <div className="text-xs text-gray-300">
                  70% completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {work.map((w, index) => (
            <div
              key={index}
              className="flex items-center gap-5 p-4 rounded-xl border border-green-500 bg-gray-800 shadow hover:shadow-green-500/20 transition-all"
            >
              <div className="bg-green-500 rounded-full p-3 flex items-center justify-center shadow-lg">
                <img
                  src={`/WorkFlow/${w.icon}.png`}
                  alt={w.name}
                  className="h-8 w-8"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {w.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
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
