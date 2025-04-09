import Marquee from "react-fast-marquee";
import { companies } from "../../data/Data.ts";

const Companies = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-20 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl [&>span]:text-green-500 text-center font-bold">
        Trusted By <span>1000+</span> Companies
      </h1>

      <Marquee
        className="mt-8"
        pauseOnHover
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-4 sm:mx-6 md:mx-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
          >
            <img
              src={`/Companies/${company}.png`}
              alt={company}
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
