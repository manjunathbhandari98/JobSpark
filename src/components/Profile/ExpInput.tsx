import fields from "../../data/Profile";
import SelectInput from "./SelectInput";
import {
  Textarea,
  Checkbox,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../../Services/ProfileService";

const ExpInput = ({
  initialValues,
  onCancel,
}: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );

  const form = useForm({
    initialValues: {
      company: initialValues?.company || "",
      title: initialValues?.title || "",
      location: initialValues?.location || "",
      startDate: initialValues?.startDate
        ? new Date(initialValues.startDate)
        : null,
      endDate: initialValues?.endDate
        ? new Date(initialValues.endDate)
        : null,
      currentlyWorking:
        initialValues?.currentlyWorking || false,
      description:
        initialValues?.description || "",
    },
  });

  const handleSave = async (values: any) => {
    const updatedExperience = {
      ...values,
      working: values.currentlyWorking,
      startDate: values.startDate
        ? values.startDate.toISOString()
        : null, // Convert Date to ISO string
      endDate: values.currentlyWorking
        ? null
        : values.endDate
        ? values.endDate.toISOString()
        : null, // Convert Date to ISO string
    };

    let updatedExperiences = [
      ...(profile?.experiences || []),
    ];

    if (initialValues) {
      const index = updatedExperiences.findIndex(
        (exp) =>
          exp.company === initialValues.company &&
          exp.title === initialValues.title
      );
      if (index !== -1) {
        updatedExperiences[index] =
          updatedExperience;
      }
    } else {
      updatedExperiences.push(updatedExperience);
    }

    try {
      await updateProfile({
        ...profile,
        experiences: updatedExperiences,
      })
      dispatch(
      changeProfile({
        ...profile,
        experiences: updatedExperiences,
      })
    );

    notifications.show({
      title: "Success",
      message: "Experience Updated Successfully",
      color: "greenTheme.5",
    });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update experience",
        color: "red.8",
      });
      return;
      
    }

    

    onCancel();
  };

  return (
    <div className="py-5">
      <div className="text-3xl font-semibold py-3">
        {initialValues ? "Edit" : "Add"}{" "}
        Experience
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput
            {...select[0]}
            form={form}
            name="title"
          />
          <SelectInput
            {...select[1]}
            form={form}
            name="company"
          />
        </div>
        <SelectInput
          {...select[2]}
          form={form}
          name="location"
        />

        {/* Duration Section */}
        <div className="flex gap-10 [&>*]:w-1/2">
          <DatePickerInput
            withAsterisk
            label="Start Date"
            {...form.getInputProps("startDate")}
            maxDate={
              form.values.endDate instanceof Date
                ? form.values.endDate
                : undefined
            }
          />
          <DatePickerInput
            withAsterisk
            label="End Date"
            {...form.getInputProps("endDate")}
            minDate={
              form.values.startDate instanceof
              Date
                ? form.values.startDate
                : undefined
            }
            maxDate={new Date()}
            disabled={
              form.values.currentlyWorking
            }
          />
        </div>

        {/* Checkbox for 'Currently Working' */}
        <Checkbox
          label="I am currently working here"
          {...form.getInputProps(
            "currentlyWorking",
            { type: "checkbox" }
          )}
        />

        <Textarea
          withAsterisk
          label="About"
          autosize
          minRows={3}
          {...form.getInputProps("description")}
        />

        <div className="flex gap-5 mt-4">
          <Button
            variant="filled"
            onClick={() =>
              form.onSubmit(handleSave)()
            }
          >
            Save
          </Button>
          <Button
            variant="outline"
            color="red.8"
            onClick={onCancel}
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpInput;
