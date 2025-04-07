// SearchBar.js
import { useState, useEffect } from "react";
import {
  Divider,
  RangeSlider,
} from "@mantine/core";
import MultiInput from "../Find-Jobs/MultiInput";
import { searchFields } from "../../data/TalentData";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onJobTitleChange: (filters: string[]) => void;
  onExperienceChange: (
    range: [number, number]
  ) => void;
  experienceRange: [number, number];
  onSkillChange: (filters: string[]) => void;
  onLocationChange: (filters: string[]) => void;
  resetMultiInput: boolean; // Add reset prop
}

const SearchBar = ({ 
  onSearch,
  onJobTitleChange,
  onExperienceChange,
  experienceRange,
  onSkillChange,
  onLocationChange,
  resetMultiInput, // Receive reset prop
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
    setTimeout(() => setResetLocalMultiInput(false), 0);
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
    if (title === "Skills") {
      onSkillChange(filters);
    } else if (title === "Job Title") {
      onJobTitleChange(filters);
    } else if (title === "Location") {
      onLocationChange(filters);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Divider size="xs" />
      <div className="flex w-full items-center py-4 px-5 rounded-lg">
        {searchFields.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-1/4 justify-between mx-2"
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
        <div className="w-1/4 px-2 [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex text-sm justify-between py-2">
            <div>Experience(Year)</div>
            <div>
              {experienceRange[0]}-
              {experienceRange[1]}
            </div>
          </div>
          <RangeSlider
            size="sm"
            color="green"
            value={experienceRange}
            onChange={onExperienceChange}
          />
        </div>
      </div>
      <Divider size="xs" />
    </div>
  );
};

export default SearchBar;



