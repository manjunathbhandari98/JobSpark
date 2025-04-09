import { ArrowLeft } from "lucide-react";
import CompanyInfo from "../components/Company/CompanyInfo";
import { Divider, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import About from "../components/Company/About";
import CompanyJobs from "../components/Company/CompanyJobs";
import CompanyEmployees from "../components/Company/CompanyEmployees";
import SimilarCompanies from "../components/Company/SimilarCompanies";
import { companyData } from "../data/Company";

const CompanyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    string | null
  >("about");
  const company = companyData;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all flex items-center gap-2 px-4 py-2 rounded-lg mb-4"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="w-full md:w-3/4 space-y-6">
          <CompanyInfo {...company} />
          <Divider
            size="xs"
            className="!border-gray-700"
          />

          <Tabs
            variant="outline"
            value={activeTab}
            onChange={setActiveTab}
            radius="md"
          >
            <Tabs.List className="[&_button]:!text-base [&_button]:!font-medium [&_button[data-active='true']]:!text-green-500">
              <Tabs.Tab value="about">
                About
              </Tabs.Tab>
              <Tabs.Tab value="jobs">
                Jobs
              </Tabs.Tab>
              <Tabs.Tab value="employees">
                Employees
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel
              value="about"
              pt="xs"
            >
              <About />
            </Tabs.Panel>
            <Tabs.Panel
              value="jobs"
              pt="xs"
            >
              <CompanyJobs {...company} />
            </Tabs.Panel>
            <Tabs.Panel
              value="employees"
              pt="xs"
            >
              <CompanyEmployees {...company} />
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* Right section (hidden on small screens) */}
        <div className="hidden md:block w-full md:w-1/4 pt-2">
          <SimilarCompanies />
        </div>
      </div>

      {/* Mobile view: Similar Companies below */}
      <div className="block md:hidden mt-8">
        <SimilarCompanies />
      </div>
    </div>
  );
};

export default CompanyPage;
