import { Divider, RangeSlider } from "@mantine/core";
import { useEffect, useState } from "react";
import { dropdownData } from "../../data/JobsData";
import MultiInput from "./MultiInput";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSalaryChange: (range: [number, number]) => void;
  salaryRange: [number, number];
  onJobTitleChange: (filters: string[]) => void;
  onLocationChange: (filters: string[]) => void;
  onExperienceChange: (filters: string[]) => void;
  resetMultiInput: boolean;
}

const SearchBar = ({
  onSalaryChange,
  salaryRange,
  onJobTitleChange,
  onLocationChange,
  onExperienceChange,
  resetMultiInput,
}: SearchBarProps) => {
  const [resetFlag, setResetFlag] = useState(false);

  // Trigger reset for MultiInput when parent says so
  useEffect(() => {
    if (resetMultiInput) {
      setResetFlag(true);
      setTimeout(() => setResetFlag(false), 0);
    }
  }, [resetMultiInput]);


  const handleMultiInputChange = (filters: string[], title: string) => {
    const handlers: Record<string, (filters: string[]) => void> = {
      "Job Title": onJobTitleChange,
      "Location": onLocationChange,
      "Experience": onExperienceChange,
    };

    handlers[title]?.(filters);
  };

  return (
    <div>
      <Divider size="xs" />
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full py-4 px-4 md:px-6">
        {dropdownData.map((option, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-1/2 lg:w-1/5"
          >
            <MultiInput
              {...option}
              onChange={(filters) => handleMultiInputChange(filters, option.title)}
              resetValue={resetFlag}
            />
            <div className="hidden sm:block">
              <Divider size="xs" orientation="vertical" />
            </div>
          </div>
        ))}

        <div className="w-full sm:w-1/2 lg:w-1/5 px-2 [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex justify-between text-sm py-2">
            <div>Salary</div>
            <div>
              ₹{salaryRange[0]} LPA - ₹{salaryRange[1]} LPA
            </div>
          </div>
          <RangeSlider size="sm" color="green" value={salaryRange} onChange={onSalaryChange} />
        </div>
      </div>
      <Divider size="xs" />
    </div>
  );
};

export default SearchBar;
