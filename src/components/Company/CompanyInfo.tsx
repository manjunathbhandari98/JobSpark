import { Avatar, useMantineColorScheme } from "@mantine/core";
import { MapPin } from "lucide-react";

const CompanyInfo = (props: any) => {
  const { colorScheme } = useMantineColorScheme(); 
      const isDark = colorScheme === "dark";
  return (
    <div className="my-4">
      {/* Banner */}
      <div className="relative">
        <img
          src="/Profile/banner.jpg"
          alt="banner"
          className="rounded-t-3xl w-full h-48 object-cover"
        />
        {/* Profile log */}
        <div
          className={`absolute top-28 left-5 p-2 ${
            isDark
              ? "bg-[#040611] text-gray-200"
              : "bg-gray-200 text-black"
          } rounded-2xl shadow-md`}
        >
          <img
            src={`/Icons/${props.Name}.png`}
            alt={props.Name}
            className="h-16 w-16 rounded-2xl object-contain"
          />
        </div>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 px-6">
        {/* Company Name and Location */}
        <div className="flex flex-col gap-1">
          <div className="text-2xl sm:text-3xl font-semibold">
            {props.Name}
          </div>
          <div className="flex items-center text-lg text-gray-600 gap-2">
            <MapPin className="w-5 h-5" />
            <span>{props.Headquarters}</span>
          </div>
        </div>

        {/* Avatar Group */}
        <div className="flex sm:justify-end">
          <Avatar.Group spacing="sm">
            <Avatar src="/avatar.png" />
            <Avatar src="/avatar1.png" />
            <Avatar src="/avtar2.png" />
            <Avatar>+10K</Avatar>
          </Avatar.Group>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
