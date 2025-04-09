import { Divider, useMantineColorScheme } from "@mantine/core";
import Card from "../components/Job-Applications/Card";
import { useSelector } from "react-redux";
import useSavedJob from "../hooks/useSavedJobs";

const SavedJobsPage = () => {
  const jobs = useSelector(
    (state: any) => state.job.jobs
  );
  const { savedJobs } = useSavedJob();

  const { colorScheme } = useMantineColorScheme(); 
          const isDark = colorScheme === "dark";
          
  return (
    <div
      className={`py-5 px-4 sm:px-6 md:px-8 lg:px-12 ${
        isDark
          ? "bg-gray-700 text-gray-200"
          : "bg-gray-300 text-black"
      }`}
    >
      <Divider size="xs" />
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs
          .filter((job: any) =>
            savedJobs.includes(job.id)
          )
          .map((data: any, index: number) => (
            <div
              key={index}
              className="h-full"
            >
              <Card
                {...data}
                saved
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedJobsPage;
