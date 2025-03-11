import Marquee from "react-fast-marquee";
import { companies } from "../../data/Data.ts";

const Companies = () => {
  return (
    <div className="p-20">
      <h1 className="text-4xl [&>span]:text-green-500 text-center font-bold">
        Trusted By <span>1000+</span> Companies
      </h1>
      <Marquee
        className="flex mt-10"
        pauseOnHover
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
          >
            <img
              src={`/Companies/${company}.png`}
              alt={company}
              className="h-16 w-auto"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
