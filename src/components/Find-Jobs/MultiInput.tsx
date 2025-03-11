import { JSX, useEffect, useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { Search } from "lucide-react";

const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

const MultiInput = (props: any) => {
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
    setData(props.options);
    console.log(props.options);
  }, []);

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

  const options = data
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
          leftSection={
            <div className="bg-gray-600 text-green-500 rounded-full p-2 mr-2">
              <props.icon size={18} />
            </div>
          }
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
                placeholder={props.title}
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
          placeholder={`Search ${props.title}`}
        />
        <Combobox.Options>
          {options}

          {!exactOptionMatch &&
            search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}

          {exactOptionMatch &&
            search.trim().length > 0 &&
            options.length === 0 && (
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
