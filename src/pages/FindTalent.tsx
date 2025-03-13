import Talents from "../components/Find-Talents/Talents";
import SearchBar from "./../components/Find-Talents/SearchBar";
const FindTalent = () => {
  return (
    <div className="py-5">
      <SearchBar />
      <Talents />
    </div>
  );
};

export default FindTalent;
