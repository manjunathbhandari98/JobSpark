import { useState } from "react";
import { dropdownData } from "../../data/JobsData";
import MultiInput from "./MultiInput";
import {
  Divider,
  RangeSlider,
} from "@mantine/core";

const SearchBar = () => {
  const [value, setValue] = useState<
    [number, number]
  >([1, 100]);
  return (
    <div className="flex flex-col w-full">
      {/* Top thin gray line */}
      <Divider size="xs" />

      {/* Search Bar Container */}
      <div className="flex w-full items-center py-4 px-5 rounded-lg">
        {/* Search Input */}

        {/* Filter Options */}
        {dropdownData.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-1/5 justify-between mx-2"
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
        <div className="w-1/5 px-2 [&_.mantine-Slider-label]:translate-y-10">
          <div className="flex text-sm justify-between py-2">
            <div>Salary</div>
            <div>
              ₹{value[0]} LPA - ₹{value[1]} LPA
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
