import { Button } from "@mantine/core";
import { Dot } from "lucide-react";
import ExpInput from "./ExpInput";
import { useEffect, useState } from "react";
import { formatDateToMonthYear } from "../../Utils/dateFormater";

const Experience = (props: any) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log(props);
  }, []);

  return edit ? (
    <ExpInput setEdit={setEdit} />
  ) : (
    <div className="w-full p-4 rounded-xl bg-white/10 border border-white/10 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        {/* Left: Company Info */}
        <div className="flex gap-4 items-start">
          {/* Company Logo */}
          <div className="bg-gray-800 p-2 rounded-xl min-w-[40px] h-[40px] sm:min-w-[48px] sm:h-[48px] flex items-center justify-center">
            <img
              src={`/Icons/${props.company}.png`}
              alt={`${props.company} logo`}
              className="h-full w-auto object-contain"
              onError={(e: any) =>
                (e.target.style.display = "none")
              }
            />
          </div>

          {/* Text Info */}
          <div>
            <div className="text-base sm:text-lg font-semibold text-white">
              {props.title}
            </div>
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-300">
              <span>{props.company}</span>
              <Dot
                className="mx-1"
                size={18}
              />
              <span>
                {props.location.split(",")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Dates */}
        <div className="text-sm text-gray-400 sm:text-right mt-2 sm:mt-0">
          {formatDateToMonthYear(props.startDate)}{" "}
          -{" "}
          {props.working
            ? "Present"
            : formatDateToMonthYear(
                props.endDate
              )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed">
        {props.description}
      </div>

      {/* Action Buttons */}
      {props.edit && (
        <div className="flex flex-wrap gap-3 mt-4">
          <Button
            variant="light"
            color="green"
            size="sm"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            size="sm"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Experience;
