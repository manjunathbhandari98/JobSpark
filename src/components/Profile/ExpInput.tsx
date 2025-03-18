import { useState } from "react";
import fields from "../../data/Profile";
import SelectInput from "./SelectInput";
import {
  Textarea,
  TextInput,
  Checkbox,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const ExpInput = (props:any) => {
  const select = fields;
  const [desc, setDesc] = useState<string>(props.description);
  const [startDate, setStartDate] =
    useState<Date | null>();
  const [endDate, setEndDate] =
    useState<Date | null>();
  const [currentlyWorking, setCurrentlyWorking] =
    useState<boolean>(false);

  return (
    <div className="py-5">
        <div className="text-3xl font-semibold py-3">{props.addExp ? 'Add' : 'Edit'} Experience</div>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[0]} />
          <SelectInput {...select[1]} />
        </div>
        <SelectInput {...select[2]} />
        {/* Duration Section */}
        <div className="flex gap-10 [&>*]:w-1/2">
          <DatePickerInput
            withAsterisk
            label="Start Date"
            value={startDate}
            maxDate={endDate || undefined}
            onChange={setStartDate}
          />

          <DatePickerInput
            withAsterisk
            label="End Date"
            value={endDate}
            minDate={startDate || undefined}
            maxDate={new Date()}
            onChange={setEndDate}
            disabled={currentlyWorking} // Disable if 'Currently Working' is checked
          />
        </div>

        {/* Checkbox for 'Currently Working' */}
        <Checkbox
          label="I am currently working here"
          checked={currentlyWorking}
          onChange={(e) => {
            setCurrentlyWorking(
              e.currentTarget.checked
            );
            if (e.currentTarget.checked)
              setEndDate(new Date()); // Clear end date if checked
          }}
        />

        <Textarea
          withAsterisk
          label="About"
          autosize
          minRows={3}
          value={desc}
          onChange={(e) =>
            setDesc(e.target.value)
          }
        />

        <div className="flex gap-5 mt-4">
          <Button
            variant="outline"
            onClick={() => props.setEdit(false)}
          >
            Save
          </Button>
          <Button
            variant=""
            color="red.8"
            onClick={() => props.setEdit(false)}
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpInput;
