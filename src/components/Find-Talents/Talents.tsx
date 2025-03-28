import { Filter, X } from "lucide-react";
import TalentCard from "./TalentCard";
import { talents } from "../../data/TalentData";

const Talents = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="text-3xl font-bold">
            Talents
          </div>
          <div className="bg-green-500 p-2 flex cursor-pointer rounded-lg">
            <X /> Clear Filter
          </div>
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <div className="py-4 mt-5 grid grid-cols-3 gap-4">
        {talents.map(
          (data: any, index: number) => (
            <TalentCard
              key={index}
              {...data}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Talents;
