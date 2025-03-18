import { useLocation } from "react-router-dom";
import JobSparkLogo from "../../assets/Logo";
import { footerLinks } from "../../data/Data";

const Footer = () => {
  const location = useLocation();
  return (
    location.pathname !== "/auth" && (
      <div className="text-white bg-[#040611]">
        <div className="flex px-20">
          <div className="flex flex-col space-y-5 w-[30%]">
            <div>
              {" "}
              <JobSparkLogo />{" "}
            </div>
            <div>
              Job portal with user profiles, skill
              updates, certifications, work
              experience and admin job postings.
            </div>
          </div>
          <div className="flex gap-7 w-[70%] justify-around">
            {footerLinks.map((links, index) => (
              <div key={index}>
                <div className="text-xl font-bold mb-6 text-green-500 text-start">
                  {links.title}
                </div>
                {links.links.map(
                  (link, index) => (
                    <div
                      key={index}
                      className="text-start mt-1 hover:text-green-400 cursor-pointer transition-transform duration-300 transform hover:translate-x-2"
                    >
                      {link}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="line py-3">
          <hr />
        </div>
        <div className="py-10 text-center font-medium">
          <div className="[&>span]:text-green-400 text-lg">
            Designed & Developed by{" "}
            <span>QuodeX</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
