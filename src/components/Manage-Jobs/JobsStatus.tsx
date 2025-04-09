import { getRelativeTime } from "../../Utils/dateUtils";
import { useMantineColorScheme } from "@mantine/core";

const JobsStatus = (props: any) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className={`rounded-xl w-full p-4 border-l-4 ${
          isDark
            ? "bg-[#1f2937] text-gray-100"
            : "bg-white text-black"
        } border-green-500 shadow-sm`}
      >
        <div className="text-lg font-semibold">
          {props.jobTitle}
        </div>
        <div className="text-sm font-medium"> 
          {props.location}
        </div>
        <div className="text-sm mt-1 text-gray-400">
          Posted {getRelativeTime(props.postTime)}
        </div>
      </div>
    </div>
  );
};

export default JobsStatus;
