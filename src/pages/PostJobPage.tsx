import { useMantineColorScheme } from "@mantine/core";
import PostJob from "../components/Post-Job/PostJob";

const PostJobPage = () => {
  const { colorScheme } = useMantineColorScheme(); 
      const isDark = colorScheme === "dark";
  return (
    <div
      className={`p-4 ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      <PostJob />
    </div>
  );
};

export default PostJobPage;
