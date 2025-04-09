import { NavLink } from "react-router-dom";
import { useMantineColorScheme } from "@mantine/core";

interface NavLinksProps {
  role: "APPLICANT" | "EMPLOYER";
  direction?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  role,
  direction = "horizontal",
  onNavigate,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const links =
    role === "APPLICANT"
      ? [
          { label: "Find Jobs", url: "/jobs" },
          {
            label: "Job Applications",
            url: "/applications",
          },
          {
            label: "Saved Jobs",
            url: "/saved-jobs",
          },
        ]
      : [
          {
            label: "Find Talent",
            url: "/talent",
          },
          {
            label: "Post a Job",
            url: "/post-job",
          },
          {
            label: "Manage Jobs",
            url: "/manage-jobs",
          },
          
        ];

  return (
    <div
      className={
        direction === "vertical"
          ? "flex flex-col gap-4"
          : "flex gap-6 font-bold"
      }
    >
      {links.map(({ label, url }) => (
        <NavLink
          key={url}
          to={url}
          onClick={onNavigate}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? "text-green-500 shadow-lg scale-105"
                : isDark
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-black"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
