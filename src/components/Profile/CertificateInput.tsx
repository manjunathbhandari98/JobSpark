import { useState } from "react";
import SelectInput from "./SelectInput";
import { Button, TextInput } from "@mantine/core";
import { companies } from "../../data/Data";
import { MonthPickerInput } from "@mantine/dates";
import { IconCancel, IconCircleCheck, IconTrash } from "@tabler/icons-react";

const CertificateInput = (props: any) => {
  const [certificate, setCertificate] =
    useState<string>();
  const [issuer, setIssuer] = useState();
  const [issueDate, setIssueDate] =
    useState<Date | null>();
  const [id, setId] = useState<string>();

  return (
    <div className="py-5">
      <div className="text-3xl font-semibold py-3">
        {props.addCerti ? "Add" : "Edit"}{" "}
        Certificate
      </div>
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          value={certificate}
          onChange={(e) =>
            setCertificate(e.target.value)
          }
          label="Certificate"
          withAsterisk
          placeholder="Add Certificate Name"
        />
        <SelectInput
          label="Company"
          options={companies}
          value={issuer}
          onChange={() => setIssuer(issuer)}
        />
        <MonthPickerInput
          withAsterisk
          label="Issue Date"
          maxDate={new Date()}
          value={issueDate}
          onChange={setIssueDate || null}
        />
        <TextInput
          withAsterisk
          label="ID"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <div className="flex gap-5 mt-4">
          <Button
            leftSection={<IconCircleCheck />}
            variant="outline"
            onClick={() => props.setEdit(false)}
          >
            Save
          </Button>
          <Button
            leftSection={<IconCancel />}
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

export default CertificateInput;
