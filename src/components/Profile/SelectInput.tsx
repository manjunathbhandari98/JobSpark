import { useEffect, useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";

const SelectInput = (props: any) => {
    const [data, setData] = useState<string[]>(props.options || []);
    const [value, setValue] = useState<string>(props.form.values[props.name] || "");
    const [search, setSearch] = useState(value || "");

    useEffect(() => {
        setData(props.options || []);
        setValue(props.form.values[props.name] || "");
        setSearch(props.form.values[props.name] || "");
    }, [props.form.values[props.name], props.options]); // Ensure the value updates

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const handleChange = (val: string) => {
        setValue(val);
        setSearch(val);
        props.form.setFieldValue(props.name, val); // Update form state
    };

    const exactOptionMatch = data.includes(search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) =>
            item.toLowerCase().includes((search || "").toLowerCase().trim())
        );

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={handleChange}
        >
            <Combobox.Target>
                <InputBase
                    withAsterisk
                    leftSection={props.leftSection && <props.leftSection />}
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        setSearch(event.currentTarget.value);
                    }}
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
                    {filteredOptions.map((item) => (
                        <Combobox.Option key={item} value={item}>
                            {item}
                        </Combobox.Option>
                    ))}
                    {!exactOptionMatch && search.trim().length > 0 && (
                        <Combobox.Option value={search}>
                            + Create {search}
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default SelectInput;
