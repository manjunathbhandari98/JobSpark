import { Button } from "@mantine/core";
import { talents } from "../../data/TalentData";
import TalentCard from "../Find-Talents/TalentCard";

const RecommendedTalents = (props: any) => {
  return (
    <div className="space-y-5 flex flex-col">
      <div className="font-bold text-2xl">
        Recommended Talents
      </div>
      <div className="py-1 mt-3 flex flex-wrap gap-4">
        {talents
          .filter(
            (talent) =>
              talent.name !== props.name || // Exclude based on name
              talent.role !== props.role || // Exclude based on role
              talent.company !== props.company // Exclude based on company
          )
          .slice(0, 3) // Show only 3 recommended profiles
          .map((data, index) => (
            <TalentCard
              key={index}
              {...data}
            />
          ))}
      </div>
    </div>
  );
};

export default RecommendedTalents;
