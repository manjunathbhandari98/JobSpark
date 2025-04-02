import { NavLink } from "react-router-dom";

interface NavLinksProps {
  role: "APPLICANT" | "EMPLOYER";
}

const NavLinks: React.FC<NavLinksProps> = ({
  role,
}) => {
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
          {
            label: "Job Applications",
            url: "/job-history",
          },
        ];

  return (
    <div className="flex gap-6 font-bold">
      {links.map(({ label, url }) => (
        <NavLink
          key={url}
          to={url}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? " text-green-500 shadow-lg scale-105"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
