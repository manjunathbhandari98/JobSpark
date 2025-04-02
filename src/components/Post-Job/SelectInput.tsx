import { useEffect, useState } from "react";
import {
  Combobox,
  InputBase,
  useCombobox,
} from "@mantine/core";

const SelectInput = (props: any) => {
  const {
    form,
    name,
    label,
    options,
    placeholder,
  } = props;
  useEffect(() => {
    setData(options);
  }, [options]);

  const combobox = useCombobox({
    onDropdownClose: () =>
      combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [search, setSearch] = useState(
    form.values[name] || ""
  ); // Initialize with form value

  const exactOptionMatch = data.some(
    (item) => item === search
  );
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );

  const mappedOptions = filteredOptions.map(
    (item) => (
      <Combobox.Option
        value={item}
        key={item}
      >
        {item}
      </Combobox.Option>
    )
  );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [
            ...current,
            search,
          ]);
          form.setFieldValue(name, search); // Update form value
        } else {
          form.setFieldValue(name, val); // Update form value
          setSearch(val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(form.values[name] || ""); // Use form value on blur
          }}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {mappedOptions}
          {!exactOptionMatch &&
            search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;
