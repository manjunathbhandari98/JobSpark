import { useState } from "react";
import CertificateInput from "./CertificateInput";
import { Button } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const Certification = (props: any) => {
  const [edit, setEdit] = useState(false);
  return edit ? (
    <CertificateInput setEdit={setEdit} />
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full">
        {/* company and about */}
        <div className="">
          {/* company */}
          <div className="flex gap-4">
            {/* logo */}
            <div className="bg-gray-800 p-2 rounded-lg">
              <img
                src={`/Icons/${props.issuer}.png`}
                alt=""
                className="h-8"
              />
            </div>
            {/* certificate */}
            <div>
              <div className="text-lg font-medium">
                {props.name}
              </div>
              <div className="flex [&>*]:text-sm">
                {props.issuer}
              </div>
            </div>
          </div>
        </div>

        {/* issued date */}
        <div className="space-y-1 text-end">
          <div>Issued {props.issueDate}</div>
          <div>ID: {props.certificateId}</div>
        </div>
      </div>
      {props.edit && (
        <div className="flex gap-5 mt-4">
          <Button
          leftSection={<IconEdit/>}
            variant="outline"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button
          leftSection={<IconTrash/>}
            variant=""
            color="red.8"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Certification;
