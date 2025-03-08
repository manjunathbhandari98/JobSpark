import { Avatar } from "@mantine/core";
import { ChevronRight } from "lucide-react";

const UserButton: React.FC = () => {
  return (
    <button className="w-full flex items-center p-4 cursor-pointer">
      <div className="flex items-center gap-3 flex-grow">
        {/* User Avatar */}
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        {/* User Details */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Harriette Spoonlicker
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            hspoonlicker@outlook.com
          </span>
        </div>
      </div>

      {/* Right Arrow Icon */}
      <ChevronRight
        size={18}
        className="text-gray-500 dark:text-gray-400"
      />
    </button>
  );
};

export default UserButton;
