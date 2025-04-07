import { ArrowLeft } from "lucide-react";
import ProfileCard from "../components/Talent-Profile/ProfileCard";
import { useNavigate } from "react-router-dom";

const TalentProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <div>
        <button className=" bg-green-500/8 flex py-2 px-4 gap-2 rounded-lg"
        onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </button>
      </div>
          <ProfileCard />

    </div>
  );
};

export default TalentProfile;
