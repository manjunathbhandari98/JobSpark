import { useMantineColorScheme } from "@mantine/core";
import Jobs from "../components/Find-Jobs/Jobs";

const FindJobs = () => {
  const { colorScheme } = useMantineColorScheme(); 
        const isDark = colorScheme === "dark";
  return (
    <div className={`min-h-[100vh] ${isDark
                  ? "bg-[#040611] text-gray-200"
                  : "bg-gray-200 text-black"
              } `}>
  
      <Jobs />
    </div>
  );
};

export default FindJobs;
