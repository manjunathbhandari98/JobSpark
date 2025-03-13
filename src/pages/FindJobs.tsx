import Jobs from "../components/Find-Jobs/Jobs";
import SearchBar from "../components/Find-Jobs/SearchBar";

const FindJobs = () => {
  return (
    <div className="min-h-[100vh] text-white bg-[#040611]">
      <SearchBar />
      <Jobs />
    </div>
  );
};

export default FindJobs;
