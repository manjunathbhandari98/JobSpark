import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { SlidersVertical } from "lucide-react";

const filterOptions = [
  "Relevant",
  "Most Recent",
  "Experience (Low to High)",
  "Experience (High to Low)",
];

const Filter = ({
  onFilter,
  selectedFilter,
}: {
  onFilter: (filter: string) => void;
  selectedFilter: string;
}) => {
  const [selectedItem, setSelectedItem] =
    useState<string>(selectedFilter);

  const combobox = useCombobox({
    onDropdownClose: () =>
      combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        onFilter(val); // Apply filter on selection
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
          <span>{selectedItem}</span>
          <SlidersVertical size={15} />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {filterOptions.map((item) => (
            <Combobox.Option
              key={item}
              value={item}
              className="!text-xs"
            >
              {item}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Filter;
