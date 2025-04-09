import { useState } from "react";
import CertificateInput from "./CertificateInput";
import { Button } from "@mantine/core";
import {
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

const Certification = (props: any) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <CertificateInput setEdit={setEdit} />
  ) : (
    <div className="w-full flex flex-col gap-4">
      {/* Certification Card */}
      <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          {/* Left: Logo + Info */}
          <div className="flex gap-4 items-start">
            <div className="bg-zinc-800 p-2 rounded-xl w-12 h-12 flex items-center justify-center">
              <img
                src={`/Icons/${props.issuer}.png`}
                alt={`${props.issuer} logo`}
                className="h-8 w-8 object-contain"
                onError={(e: any) =>
                  (e.target.style.display =
                    "none")
                }
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {props.name}
              </h3>
              <p className="text-sm text-gray-400">
                {props.issuer}
              </p>
            </div>
          </div>

          {/* Right: Dates */}
          <div className="text-right space-y-1 text-sm text-gray-400">
            <div>
              Issued:{" "}
              {new Date(
                props.issueDate
              ).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="text-xs">
              ID: {props.certificateId}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons - below the card */}
      {props.edit && (
        <div className="flex gap-3 sm:gap-5 justify-end">
          <Button
            variant="light"
            color="blue"
            leftSection={<IconEdit size={16} />}
            onClick={() => setEdit(true)}
            size="xs"
            radius="xl"
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            leftSection={<IconTrash size={16} />}
            size="xs"
            radius="xl"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Certification;
