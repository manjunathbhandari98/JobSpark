import { JSX, useEffect, useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";

interface MultiInputProps {
  options: string[];
  title: string;
  icon: React.ComponentType<any>;
  onChange: (values: string[]) => void;
  resetValue: boolean; // Add reset prop
}

const MultiInput = ({
  options,
  title,
  icon,
  onChange,
  resetValue,
}: MultiInputProps) => {
  const combobox = useCombobox({
    onDropdownClose: () =>
      combobox.resetSelectedOption(),
    onDropdownOpen: () =>
      combobox.updateSelectedOptionIndex(
        "active"
      ),
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>(
    []
  );

  useEffect(() => {
    setData(options);
  }, [options]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  useEffect(() => {
    if (resetValue) {
      setValue([]);
    }
  }, [resetValue]);

  const exactOptionMatch = data.some(
    (item) => item === search
  );

  const handleValueSelect = (val: string) => {
    setSearch("");

    if (val === "$create") {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
    } else {
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val]
      );
    }
  };

  const handleValueRemove = (val: string) =>
    setValue((current) =>
      current.filter((v) => v !== val)
    );

  const values = value.slice(0, 1).map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
    >
      {item}
    </Pill>
  ));

  const comboboxOptions = data
    .filter((item) =>
      item
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
      >
        <Group gap="sm">
          {value.includes(item) ? (
            <CheckIcon size={12} />
          ) : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          rightSection={
            <Combobox.Chevron size="lg" />
          }
          onClick={() => combobox.openDropdown()}
        >
          <Pill.Group>
            {values}
            {value.length > 1 && (
              <Pill>
                +{value.length - 1} more
              </Pill>
            )}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() =>
                  combobox.openDropdown()
                }
                onBlur={() =>
                  combobox.closeDropdown()
                }
                value={search}
                placeholder={title}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(
                    event.currentTarget.value
                  );
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Backspace" &&
                    search.length === 0
                  ) {
                    event.preventDefault();
                    handleValueRemove(
                      value[value.length - 1]
                    );
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) =>
            setSearch(event.currentTarget.value)
          }
          placeholder={`Search ${title}`}
        />
        <Combobox.Options>
          {comboboxOptions}
          {!exactOptionMatch &&
            search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
          {exactOptionMatch &&
            search.trim().length > 0 &&
            comboboxOptions.length === 0 && (
              <Combobox.Empty>
                Nothing found
              </Combobox.Empty>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;
