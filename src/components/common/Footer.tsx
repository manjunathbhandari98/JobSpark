import { useLocation } from "react-router-dom";
import JobSparkLogo from "../../assets/Logo";
import { footerLinks } from "../../data/Data";
import { useMantineColorScheme } from "@mantine/core";

const Footer = () => {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme(); 
  const isDark = colorScheme === "dark";

  return (
    location.pathname !== "/auth" && (
      <div
        className={`${
          isDark
            ? "bg-[#040611] text-gray-200"
            : "bg-gray-200 text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-10 px-6 md:px-20 py-10">
          {/* Left Section */}
          <div className="flex flex-col space-y-5 md:w-[30%] w-full">
            <JobSparkLogo />
            <div className="text-sm ">
              Job portal with user profiles, skill
              updates, certifications, work
              experience and admin job postings.
            </div>
          </div>

          {/* Right Section - Footer Links */}
          <div className="flex flex-wrap md:flex-nowrap gap-10 justify-start md:justify-around md:w-[70%] w-full">
            {footerLinks.map((links, index) => (
              <div
                key={index}
                className="min-w-[120px]"
              >
                <div className="text-xl font-bold mb-4 text-green-500">
                  {links.title}
                </div>
                {links.links.map(
                  (link, index) => (
                    <div
                      key={index}
                      className="text-sm mt-1  hover:text-green-400 cursor-pointer transition-transform duration-300 transform hover:translate-x-2"
                    >
                      {link}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="py-3">
          <hr className="border-gray-700" />
        </div>

        {/* Bottom Section */}
        <div className="py-6 text-center font-medium text-sm">
          <div className="[&>span]:text-green-400">
            Designed & Developed by{" "}
            <span>QuodeX</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
