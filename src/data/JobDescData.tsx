// src/data/jobCardData.ts

import {
  IconBriefcase,
  IconMapPin,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";

export const getJobCardData = (selectedJob: any) => [
  {
    name: "Location",
    icon: IconMapPin,
    value: selectedJob?.location || "N/A",
  },
  {
    name: "Experience",
    icon: IconBriefcase,
    value: selectedJob?.experience || "N/A",
  },
  {
    name: "Salary",
    icon: IconPremiumRights,
    value: selectedJob?.packageOffered || "N/A",
  },
  {
    name: "Job Type",
    icon: IconRecharging,
    value: selectedJob?.jobType || "N/A",
  },
];
