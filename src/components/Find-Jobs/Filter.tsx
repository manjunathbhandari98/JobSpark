import { useState } from "react";
import {
  Combobox,
  useCombobox,
} from "@mantine/core";
import { SlidersVertical } from "lucide-react";

const filterOptions = [
  "Relevant",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

const Filter = () => {
  // ✅ Fixed useState syntax
  const [selectedItem, setSelectedItem] =
    useState<string | null>("Relevant");

  const combobox = useCombobox({
    onDropdownClose: () =>
      combobox.resetSelectedOption(),
  });

  const options = filterOptions.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
      className="!text-xs"
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      // withArrow
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          onClick={() =>
            combobox.toggleDropdown()
          }
          className="border border-green-500 rounded-lg flex items-center gap-2 py-1 px-2 cursor-pointer"
        >
          {/* Show selected filter or default text */}
          <span>{selectedItem || "Filter"}</span>
          <SlidersVertical size={15} />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Filter;
