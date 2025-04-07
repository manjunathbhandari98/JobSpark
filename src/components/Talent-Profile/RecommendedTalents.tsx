import TalentCard from "../Find-Talents/TalentCard";

interface RecommendedTalentsProps {
  talents: any[];
}


const RecommendedTalents = ({
  talents
}: RecommendedTalentsProps) => {
  return (
    <div className="space-y-5 flex flex-col">
      <div className="font-bold text-2xl">
        Recommended Talents
      </div>
      <div className="py-1 mt-3 flex flex-wrap gap-4">
        {talents
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
