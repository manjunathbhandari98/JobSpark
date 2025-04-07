// SearchBar.js
import { useEffect, useState } from "react";
import { dropdownData } from "../../data/JobsData";
import MultiInput from "./MultiInput";
import {
  Divider,
  RangeSlider,
} from "@mantine/core";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSalaryChange: ( 
    range: [number, number]
  ) => void;
  salaryRange: [number, number];
  onJobTitleChange: (filters: string[]) => void;
  onLocationChange: (filters: string[]) => void;
  onExperienceChange: (filters: string[]) => void;
  resetMultiInput:boolean;
}

const SearchBar = ({
  onSearch,
  onSalaryChange,
  salaryRange,
  onJobTitleChange,
  onLocationChange,
  onExperienceChange,
  resetMultiInput,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] =
    useState("");
  const [
    resetLocalMultiInput,
    setResetLocalMultiInput,
  ] = useState(false);

  useEffect(() => {
    if (resetMultiInput) {
      setResetLocalMultiInput(true);
      setTimeout(
        () => setResetLocalMultiInput(false),
        0
      );
    }
  }, [resetMultiInput]);

  useEffect(() => {
    setResetLocalMultiInput(false);
  }, [resetLocalMultiInput]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleMultiInputChange = (
    filters: string[],
    title: string
  ) => {
    if (title === "Job Title") {
      onJobTitleChange(filters);
    } else if (title === "Location") {
      onLocationChange(filters);
    } else if (title === "Experience") {
      onExperienceChange(filters);
    }
  };

  return (
    <div>
      <Divider size="xs" />
      <div className="flex w-full items-center py-4 px-5 rounded-lg">
        {dropdownData.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-1/5 justify-between mx-2"
          >
            <div className="text-white">
              <MultiInput
                             {...option}
                             onChange={(filters) =>
                               handleMultiInputChange(
                                 filters,
                                 option.title
                               )
                             }
                             resetValue={resetLocalMultiInput} // Pass reset prop
                           />
            </div>
            <Divider
              size="xs"
              orientation="vertical"
            />
          </div>
        ))}
        <div className="w-1/5 px-2 [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex text-sm justify-between py-2">
            <div>Salary</div>
            <div>
              ₹{salaryRange[0]} LPA - ₹
              {salaryRange[1]} LPA
            </div>
          </div>
          <RangeSlider
            size="sm"
            color="green"
            value={salaryRange}
            onChange={onSalaryChange}
          />
        </div>
      </div>
      <Divider size="xs" />
    </div>
  );
};

export default SearchBar;
