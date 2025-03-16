import { companyData } from "../../data/Company";

const About = () => {
  return (
    <div className="py-4 flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          Overview
        </div>
        <div className="text-md">
          {companyData.Overview}
        </div>
      </div>

      {/* Industry */}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          Industry
        </div>
        <div className="text-m">
          {companyData.Industry}
        </div>
      </div>

      {/* HeadQuarter */}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          HeadQuarter
        </div>
        <div className="text-md">
          {companyData.Headquarters}
        </div>
      </div>

      {/* Website */}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          Website
        </div>
        <div className="text-md text-green-500">
          <a href={companyData.Website}>
            {companyData.Website}
          </a>
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          Size
        </div>
        <div className="text-md">
          {companyData.Size}
        </div>
      </div>

      {/* Specialities */}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          Specialities
        </div>
        <div className="text-md flex flex-wrap gap-2">
         {companyData.Specialties.map((data,index) =>(
            <div key={index} className="flex gap-1">
               <div>&bull;</div>
               <div>{data}</div>
            </div>
         ))}
        </div>
      </div>

      {/* overview */}
    </div>
  );
};

export default About;
