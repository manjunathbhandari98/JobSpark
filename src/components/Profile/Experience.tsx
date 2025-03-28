import { Button, Divider } from "@mantine/core";
import { Dot } from "lucide-react";
import ExpInput from "./ExpInput";
import { useEffect, useState } from "react";
import { formatDateToMonthYear } from "../../Utils/dateFormater";

const Experience = (props: any) => {
  const [edit, setEdit] = useState(false);
  useEffect(()=>{
    console.log(props);
    
  },[])
  return edit ? (
    <ExpInput setEdit={setEdit} />
  ) : (
    <div className="w-full">
      <div className="flex  flex-col">
        {/* company and about */}
        <div className="flex justify-between">
          {/* company */}

          <div className="flex gap-4">
            {/* logo */}
            <div className="bg-gray-800 p-2 rounded-lg">
              <img
                src={`/Icons/${props.company}.png`}
                alt=""
                className="h-8"
              />
            </div>
            {/* role */}
            <div>
              <div className="text-lg font-medium">
                {props.title}
              </div>
              <div className="flex [&>*]:text-sm">
                <div>{props.company}</div>
                <div>
                  <Dot />
                </div>
                <div>
                  {props.location.split(",")[0]}
                </div>
              </div>
            </div>
          </div>
          <div>
            {formatDateToMonthYear(
              props.startDate
            )}{" "}
            -{" "}
            {props.working
              ? "Present"
              : formatDateToMonthYear(
                  props.endDate
                )}
          </div>
        </div>
        {/* about */}
        <div className="mt-4">
          {props.description}
        </div>

        {/* period */}
      </div>

      {props.edit && (
        <div className="flex gap-5 mt-4">
          <Button
            variant="outline"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button
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

export default Experience;
