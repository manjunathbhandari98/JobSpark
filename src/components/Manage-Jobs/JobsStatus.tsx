import { getRelativeTime } from "../../Utils/dateUtils";

const JobsStatus = (props: any) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-800 rounded-xl w-full p-2 border-l-4 border-green-500">
        <div className="text-md font-medium">{props.jobTitle}</div>
        <div className="text-sm font-medium">{props.location}</div>
        <div className="text-sm">Posted{' '}{getRelativeTime(props.postTime)}</div>
      </div>
    </div>
  );
};

export default JobsStatus;
