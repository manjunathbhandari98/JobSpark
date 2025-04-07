import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import SelectInput from "./SelectInput";
import { companies } from "../../data/Data";
import { updateProfile } from "../../Services/ProfileService"; // ✅ Don't forget this!

const CertificateInput = ({
  initialValues,
  onCancel,
}: any) => {
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  ); // ✅ Use selectedProfile

  const form = useForm({
    initialValues: {
      name: initialValues?.name || "",
      issuer: initialValues?.issuer || "",
      issueDate: initialValues?.issueDate
        ? new Date(initialValues.issueDate)
        : null,
      certificateId:
        initialValues?.certificateId || "",
    },
  });

  const handleSave = async (values: any) => {
    const updatedCertificate = {
      ...values,
      issueDate: values.issueDate
        ? values.issueDate.toISOString()
        : null,
    };

    let updatedCertificates = [
      ...(profile?.certificates || []),
    ];

    if (initialValues) {
      const index = updatedCertificates.findIndex(
        (cert) => cert === initialValues
      );
      if (index !== -1) {
        updatedCertificates[index] =
          updatedCertificate;
      }
    } else {
      updatedCertificates.push(
        updatedCertificate
      );
    }

    try {
      const response = await updateProfile({
        ...profile,
        certificates: updatedCertificates,
      });

      dispatch(changeProfile(response.data)); // ✅ Sync with backend

      notifications.show({
        title: "Success",
        message:
          "Certificate updated successfully",
        color: "greenTheme.5",
      });
      onCancel();
    } catch (error) {
      console.error(
        "Error saving certificate:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to update certificate",
        color: "red.5",
      });
    }
  };

  return (
    <div className="py-5">
      <div className="text-3xl font-semibold py-3">
        {initialValues ? "Edit" : "Add"}{" "}
        Certificate
      </div>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Certificate Name"
          withAsterisk
          placeholder="Enter Certificate Name"
          name="name"
          {...form.getInputProps("name")}
        />
        <SelectInput
          label="Issuer"
          options={companies}
          form={form}
          name="issuer"
        />
        <DatePickerInput
          withAsterisk
          label="Issue Date"
          maxDate={new Date()}
          {...form.getInputProps("issueDate")}
        />
        <TextInput
          label="Certificate ID"
          withAsterisk
          placeholder="Enter ID"
          {...form.getInputProps("certificateId")}
        />
        <div className="flex gap-5 mt-4">
          <Button
            variant="filled"
            onClick={() =>
              handleSave(form.values)
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

export default CertificateInput;
