import { useState } from "react";
import { dropdownData } from "../../data/JobsData";
import {
  Divider,
  RangeSlider,
} from "@mantine/core";
import MultiInput from "../Find-Jobs/MultiInput";
import { searchFields } from "../../data/TalentData";

const SearchBar = () => {
  const [value, setValue] = useState<
    [number, number]
  >([0, 50]);
  return (
    <div className="flex flex-col w-full">
      {/* Top thin gray line */}
      <Divider size="xs" />

      {/* Search Bar Container */}
      <div className="flex w-full items-center py-4 px-5 rounded-lg">
        {/* Search Input */}

        {/* Filter Options */}
        {searchFields.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-1/4 justify-between mx-2"
          >
            <div className="text-white">
              <MultiInput {...option} />
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
              {value[0]}-{value[1]}
            </div>
          </div>
          <RangeSlider
            size="sm"
            color="green"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      {/* Bottom thin gray line */}
      <Divider size="xs" />
    </div>
  );
};

export default SearchBar;
