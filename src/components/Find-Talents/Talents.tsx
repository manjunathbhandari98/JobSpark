import TalentCard from "./TalentCard";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../../Services/ProfileService";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { getAllUsers } from "../../Services/UserService";
import { Button, useMantineColorScheme } from "@mantine/core";
import { X } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  title: string;
  skills: string[];
  location: string;
  experience: number;
  createdAt: string;
  about: string;
  picture: string;
  totalExperience: number;
  invite?: boolean;
  manage?: boolean;
  jobTitle: string;
  company: string;
}

interface User {
  profileId: number;
  name: string;
  accountType: string;
}

const Talents = () => {
  const [profileList, setProfileList] = useState<
    Profile[]
  >([]);
  const [filteredProfiles, setFilteredProfiles] =
    useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] =
    useState<string>("");
  const [jobTitle, setJobTitle] = useState<
    string[]
  >([]);
  const [experienceRange, setExperienceRange] =
    useState<[number, number]>([0, 50]);
  const [skillFilters, setSkillFilters] =
    useState<string[]>([]);
  const [locationFilters, setLocationFilters] =
    useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] =
    useState<string>("Relevant");
  const [users, setUsers] = useState<User[]>([]);
  const [isClearingFilter, setIsClearingFilter] =
    useState<boolean>(false);
  const [resetMultiInput, setResetMultiInput] =
    useState(false); // Add reset state
      const { colorScheme } =
        useMantineColorScheme();

      const isDark = colorScheme === "dark";

  useEffect(() => {
    const fetchProfilesAndUsers = async () => {
      try {
        const usersResponse: User[] =
          await getAllUsers();
        const applicants: User[] =
          usersResponse.filter(
            (user: User) =>
              user.accountType === "APPLICANT"
          );
        setUsers(applicants);
          
        const profileResponse =
          await getAllProfiles();
        const allProfiles: Profile[] =
          profileResponse.data;

        const applicantProfileIds = new Set(
          applicants.map(
            (user: User) => user.profileId
          )
        );

        const matchedProfiles: Profile[] =
          allProfiles.filter((profile: Profile) =>
            applicantProfileIds.has(profile.id)
          );

        setProfileList(matchedProfiles);
        setFilteredProfiles(matchedProfiles);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      }
    };

    fetchProfilesAndUsers();
  }, []);

  useEffect(() => {
    if (!isClearingFilter) {
      applyFilters();
    }
    setIsClearingFilter(false);
  }, [
    profileList,
    searchQuery,
    jobTitle,
    skillFilters,
    locationFilters,
    experienceRange,
    selectedFilter,
    isClearingFilter,
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleJobTitleChange = (
    titles: string[]
  ) => {
    setJobTitle(titles);
  };

  const handleExperienceChange = (
    range: [number, number]
  ) => {
    setExperienceRange(range);
  };

  const handleSkillChange = (
    filters: string[]
  ) => {
    setSkillFilters(filters);
  };

  const handleLocationChange = (
    filters: string[]
  ) => {
    setLocationFilters(filters);
  };

  const handleFilter = (filterType: string) => {
    setSelectedFilter(filterType);
  };

  const applyFilters = () => {
    let filtered: Profile[] = profileList.filter(
      (profile: Profile) => {
        const skillMatch =
          skillFilters.length === 0 ||
          (profile.skills &&
            profile.skills.some((skill) =>
              skill
                .toLowerCase()
                .includes(
                  skillFilters
                    .join(" ")
                    .toLowerCase()
                )
            ));
        const locationMatch =
          locationFilters.length === 0 ||
          locationFilters.some((filter) =>
            profile.location
              ?.toLowerCase()
              .includes(filter.toLowerCase())
          );
        const experienceMatch =
          profile.totalExperience >=
            experienceRange[0] &&
          profile.totalExperience <=
            experienceRange[1];
        const searchQueryMatch =
          searchQuery === "" ||
          profile.name
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            ) ||
          profile.title
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            ) ||
          (profile.skills &&
            profile.skills.some((skill) =>
              skill
                .toLowerCase()
                .includes(
                  searchQuery.toLowerCase()
                )
            ));
        const jobTitleMatch =
          jobTitle.length === 0 ||
          jobTitle.some((title) =>
            profile.jobTitle
              ?.toLowerCase()
              .includes(title.toLowerCase())
          );
        return (
          skillMatch &&
          locationMatch &&
          experienceMatch &&
          searchQueryMatch &&
          jobTitleMatch
        );
      }
    );

    let sortedProfiles: Profile[] = [...filtered];

    switch (selectedFilter) {
      case "Most Recent":
        sortedProfiles.sort(
          (a: Profile, b: Profile) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;
      case "Experience (Low to High)":
        sortedProfiles.sort(
          (a: Profile, b: Profile) =>
            a.totalExperience - b.totalExperience
        );
        break;
      case "Experience (High to Low)":
        sortedProfiles.sort(
          (a: Profile, b: Profile) =>
            b.totalExperience - a.totalExperience
        );
        break;
      default:
    }

    setFilteredProfiles(sortedProfiles);
  };

 const clearFilter = () => {
   setIsClearingFilter(true);

   setSearchQuery("");
   setJobTitle([]);
   setExperienceRange([0, 50]);
   setSkillFilters([]);
   setLocationFilters([]);
   setSelectedFilter("Relevant");
   setFilteredProfiles(profileList);

   setResetMultiInput(true); // Trigger reset
   setTimeout(() => setResetMultiInput(false), 0); // Reset after a tiny delay
 };

 const isFilterApplied =
   searchQuery !== "" ||
   jobTitle.length > 0 ||
   skillFilters.length > 0 ||
   locationFilters.length > 0 ||
   experienceRange[0] !== 0 ||
   experienceRange[1] !== 50 ||
   selectedFilter !== "Relevant";

  return (
    <div
      className={`p-4 min-h-screen transition-colors  ${
        isDark
          ? "bg-[#040611] text-white"
          : "bg-white text-black"
      }`}
    >
      <SearchBar
        onSearch={handleSearch}
        onExperienceChange={
          handleExperienceChange
        }
        onJobTitleChange={handleJobTitleChange}
        experienceRange={experienceRange}
        onSkillChange={handleSkillChange}
        onLocationChange={handleLocationChange}
        resetMultiInput={resetMultiInput} // Pass reset prop
      />
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl md:text-3xl font-bold">
            Talents
          </div>
          {isFilterApplied && (
            <Button
              onClick={clearFilter}
              radius={50}
              variant="outline"
              color="red"
              className="text-red-500"
            >
              Clear Filter{" "}
              <X
                size={18}
                className="ml-2"
              />
            </Button>
          )}
        </div>
        <Filter
          onFilter={handleFilter}
          selectedFilter={selectedFilter}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(
            (profile, index) => {
              const user = users.find(
                (user) =>
                  user.profileId === profile.id
              );
              return (
                <TalentCard
                  key={index}
                  {...profile}
                  userName={
                    user?.name || "Unknown"
                  }
                />
              );
            }
          )
        ) : (
          <p className="col-span-full text-center mt-10">
            No talents found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Talents;
