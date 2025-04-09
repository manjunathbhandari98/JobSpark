import { useState, useEffect } from "react";
import {
  Divider,
  RangeSlider,
  useMantineColorScheme,
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
  resetMultiInput: boolean;
}

const SearchBar = ({
  onSearch,
  onJobTitleChange,
  onExperienceChange,
  experienceRange,
  onSkillChange,
  onLocationChange,
  resetMultiInput,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] =
    useState("");
  const [
    resetLocalMultiInput,
    setResetLocalMultiInput,
  ] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (resetMultiInput) {
      setResetLocalMultiInput(true);
      setTimeout(
        () => setResetLocalMultiInput(false),
        0
      );
    }
  }, [resetMultiInput]);

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
    <div
      className={`w-full flex flex-col ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-100 text-black"
      } rounded-lg shadow-sm`}
    >
      <Divider size="xs" />
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full py-4 px-4 md:px-6">
        {searchFields.map((option, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start  sm:items-center gap-2 sm:gap-3 sm:w-[calc(50%-0.5rem)] md:w-1/4"
          >
            <MultiInput
              {...option}
              onChange={(filters) =>
                handleMultiInputChange(
                  filters,
                  option.title
                )
              }
              resetValue={resetLocalMultiInput}
            />
            <div className="hidden sm:block">
              <Divider
                size="xs"
                orientation="vertical"
              />
            </div>
          </div>
        ))}

        <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-1/4 px-1 [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex text-sm justify-between py-2 ">
            <div>Experience (Year)</div>
            <div>
              {experienceRange[0]} -{" "}
              {experienceRange[1]}
            </div>
          </div>
          <RangeSlider
            size="sm"
            color="green"
            value={experienceRange}
            onChange={onExperienceChange}
            classNames={{
              bar: isDark
                ? "bg-green-400"
                : "bg-green-600",
              thumb: isDark
                ? "border-white"
                : "border-black",
            }}
          />
        </div>
      </div>
      <Divider
        size="xs"
        className="dark:border-zinc-700"
      />
    </div>
  );
};

export default SearchBar;
