import { ArrowLeft } from "lucide-react";
import ProfileCard from "../components/Talent-Profile/ProfileCard";
import { profile } from "../data/TalentData";
import RecommendedTalents from "../components/Talent-Profile/RecommendedTalents";

const TalentProfile = () => {
  return (
    <div className="p-5">
      <div>
        <button className=" bg-green-500/8 flex py-2 px-4 gap-2 rounded-lg">
          <ArrowLeft />
          Back
        </button>
      </div>
      <div className="flex gap-5">
        <div className="w-2/3">
          <ProfileCard {...profile} />
        </div>
        <div className="w-1/3 pt-4">
          <RecommendedTalents {...profile} />
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
