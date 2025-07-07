
import { Dot } from "lucide-react";
import { formatDateToMonthYear } from './../../Utils/dateFormater';

const Experience = (props: any) => {
  return (
    <div>
      <div className="flex flex-col">
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
            {!props.working ? (
              <div>
                {formatDateToMonthYear(
                  props.startDate
                )}{" "}
                -{" "}
                {formatDateToMonthYear(
                  props.endDate
                )}
              </div>
            ) : (
              <div>
                {formatDateToMonthYear(
                  props.startDate
                )}{" "}
                -{" "}
                Present
              </div>
            )}
          </div>
        </div>
        {/* about */}
        <div className="mt-4">
          {props.description}
        </div>

        {/* period */}
      </div>
    </div>
  );
};

export default Experience;
