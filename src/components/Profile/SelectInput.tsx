import { useEffect, useState } from "react";
import {
  Combobox,
  InputBase,
  useCombobox,
} from "@mantine/core";

const SelectInput = (props: any) => {

  const [data, setData] = useState<string[]>([]);

  const [value, setValue] = useState<
    string
  >();
  const [search, setSearch] = useState("");


useEffect(() => {

  setData(props.options || []); // Ensure `options` is always an array
  setValue(props.value); // Default `null` if value is undefined
  setSearch(props.search || ""); // Default empty string if search is undefined

  
}, []);


  

  const combobox = useCombobox({
    onDropdownClose: () =>
      combobox.resetSelectedOption(),
  });

  

  const exactOptionMatch = data.some(
    (item) => item === search
  );
 const filteredOptions = exactOptionMatch
   ? data
   : data.filter((item) =>
       item
         .toLowerCase()
         .includes(
           (search || "").toLowerCase().trim()
         )
     );

  const options = filteredOptions.map((item) => (
    <Combobox.Option
      value={item}
      key={item}
    >
      {item}
    </Combobox.Option>
  ));

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
          setValue(value);
        } else {
          setValue(val);
          setSearch(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          leftSection={props.leftSection && <props.leftSection/>}
          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={value}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
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
