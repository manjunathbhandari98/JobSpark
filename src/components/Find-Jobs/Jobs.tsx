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
    useState(false);
  const [isClearingFilter, setIsClearingFilter] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        const activeJobs = response.data.filter(
          (job: any) => job.jobStatus === "ACTIVE"
        );
        dispatch(setJobs(activeJobs));
        setFilteredJobs(activeJobs);
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
    experienceFilters,
  ]);

  const handleSearch = (query: string) =>
    setSearchQuery(query);
  const handleFilter = (filterType: string) =>
    setSelectedFilter(filterType);
  const handleSalaryRangeChange = (
    range: [number, number]
  ) => setSalaryRange(range);
  const handleJobTitleFilterChange = (
    filters: string[]
  ) => setJobTitleFilters(filters);
  const handleLocationFilterChange = (
    filters: string[]
  ) => setLocationFilters(filters);
  const handleExperienceFilterChange = (
    filters: string[]
  ) => setExperienceFilters(filters);

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
      // No sort
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
    setResetMultiInput(true);
    setTimeout(
      () => setResetMultiInput(false),
      0
    );
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
    <div className="px-2 sm:px-4 md:px-8">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 py-4 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <h2 className="text-xl font-semibold">
            Recommended Jobs
          </h2>
          {isFilterApplied && (
            <Button
              onClick={clearFilter}
              radius={50}
              variant="outline"
              color="red.8"
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

      {/* Job Cards Grid */}
      <div className="py-4 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <p className="col-span-full text-center text-gray-400">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
