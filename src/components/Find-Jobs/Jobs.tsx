// Jobs.js
import { useState, useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { getJobs } from "../../Services/JobService";
import { setJobs } from "../../Slices/JobSlice";
import { Button } from "@mantine/core";
import { X } from "lucide-react";

const Jobs = () => {
  const dispatch = useDispatch();
  const allJobs =
    useSelector((state: any) => state.job.jobs) ||
    [];
  const [filteredJobs, setFilteredJobs] =
    useState(allJobs);
  const [searchQuery, setSearchQuery] =
    useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("Relevant");
  const [salaryRange, setSalaryRange] = useState<
    [number, number]
  >([1, 100]);
  const [jobTitleFilters, setJobTitleFilters] =
    useState<string[]>([]);
  const [locationFilters, setLocationFilters] =
    useState<string[]>([]);
  const [
    experienceFilters,
    setExperienceFilters,
  ] = useState<string[]>([]);
    const [resetMultiInput, setResetMultiInput] =
      useState(false); // Add reset state
      const [isClearingFilter, setIsClearingFilter] =
          useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        const activeJobs = response.data.filter((job:any) => job.jobStatus === 'ACTIVE')
        dispatch(setJobs(activeJobs));
        setFilteredJobs(activeJobs)
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error
        );
      }
    };

    fetchJobs();
  }, [dispatch]);


  useEffect(() => {
    if (!isClearingFilter) {
      applyFilters();
    }
    setIsClearingFilter(false);
  }, [
    searchQuery,
    selectedFilter,
    salaryRange,
    jobTitleFilters,
    locationFilters,
    experienceFilters
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filterType: string) => {
    setSelectedFilter(filterType);
  };

  const handleSalaryRangeChange = (
    range: [number, number]
  ) => {
    setSalaryRange(range);
  };

  const handleJobTitleFilterChange = (
    filters: string[]
  ) => {
    setJobTitleFilters(filters);
  };

  const handleLocationFilterChange = (
    filters: string[]
  ) => {
    setLocationFilters(filters);
  };

  const handleExperienceFilterChange = (
    filters: string[]
  ) => {
    setExperienceFilters(filters);
  };

  const applyFilters = () => {
    let filtered = allJobs.filter((job: any) => {
      const jobTitleMatch =
        jobTitleFilters.length === 0 ||
        jobTitleFilters.some((filter) =>
          job.jobTitle
            .toLowerCase()
            .includes(filter.toLowerCase())
        );

      const locationMatch =
        locationFilters.length === 0 ||
        locationFilters.some((filter) =>
          job.location
            .toLowerCase()
            .includes(filter.toLowerCase())
        );

      const experienceMatch =
        experienceFilters.length === 0 ||
        experienceFilters.some((filter) =>
          job.experience
            .toLowerCase()
            .includes(filter.toLowerCase())
        );

      const salary = parseInt(
        job.packageOffered.split(" ")[0]
      );
      const salaryMatch =
        salary >= salaryRange[0] &&
        salary <= salaryRange[1];

      const searchQueryMatch =
        searchQuery === "" ||
        job.jobTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        job.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        job.location
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        jobTitleMatch &&
        locationMatch &&
        experienceMatch &&
        salaryMatch &&
        searchQueryMatch
      );
    });

    let sortedJobs = [...filtered];

    switch (selectedFilter) {
      case "Most Recent":
        sortedJobs.sort(
          (a, b) =>
            new Date(b.postTime).getTime() -
            new Date(a.postTime).getTime()
        );
        break;
      case "Salary (Low to High)":
        sortedJobs.sort(
          (a, b) =>
            parseInt(
              a.packageOffered.split(" ")[0]
            ) -
            parseInt(
              b.packageOffered.split(" ")[0]
            )
        );
        break;
      case "Salary (High to Low)":
        sortedJobs.sort(
          (a, b) =>
            parseInt(
              b.packageOffered.split(" ")[0]
            ) -
            parseInt(
              a.packageOffered.split(" ")[0]
            )
        );
        break;
      default:
      // Already filtered, no additional sorting needed
    }

    setFilteredJobs(sortedJobs);
  };

  const clearFilter = () => {
    setIsClearingFilter(true);
    setSearchQuery("");
    setSelectedFilter("Relevant");
    setSalaryRange([1, 100]);
    setJobTitleFilters([]);
    setLocationFilters([]);
    setExperienceFilters([]);
    setFilteredJobs(allJobs);

    setResetMultiInput(true); // Trigger reset
    setTimeout(
      () => setResetMultiInput(false),
      0
    ); // Reset after a tiny delay
  };

  const isFilterApplied =
    searchQuery.trim() !== "" ||
    jobTitleFilters.length > 0 ||
    experienceFilters.length > 0 ||
    locationFilters.length > 0 ||
    salaryRange[0] !== 1 ||
    salaryRange[1] !== 100 ||
    selectedFilter !== "Relevant";

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        onSalaryChange={handleSalaryRangeChange}
        salaryRange={salaryRange}
        onJobTitleChange={
          handleJobTitleFilterChange
        }
        onLocationChange={
          handleLocationFilterChange
        }
        onExperienceChange={
          handleExperienceFilterChange
        }
        resetMultiInput={resetMultiInput}
      />
      <div className="flex justify-between items-center px-5 py-2">
        <div className="flex gap-3">
          <h2 className="text-xl font-semibold">
            Recommended Jobs
          </h2>
          {isFilterApplied && (
            <Button
              onClick={clearFilter}
              radius={50}
              variant="outline"
              color="red.8"
              className="text-red-500 cursor-pointer"
            >
              Clear Filter
              <X size={20} className="ml-4"/>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter
            onFilter={handleFilter}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>
      <div className="py-4 px-4 mt-5 grid grid-cols-4 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(
            (data: any, index: number) => (
              <JobCard
                key={index}
                {...data}
              />
            )
          )
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
