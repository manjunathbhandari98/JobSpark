const fields = [
  {
    name: "jobTitle", // ✅ Added unique 'name'
    label: "Job Title",
    placeholder: "Enter Job Title",
    options: [
      "Designer",
      "Software Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
    ],
  },
  {
    name: "company", // ✅ Added unique 'name'
    label: "Company",
    placeholder: "Enter Company Name",
    options: [
      "Google",
      "Microsoft",
      "Meta",
      "Netflix",
      "Adobe",
      "Facebook",
      "Amazon",
      "Apple",
      "Spotify",
    ],
  },
  {
    name: "experience", // ✅ Added unique 'name'
    label: "Experience",
    placeholder: "Enter Experience Level",
    options: [
      "Entry Level",
      "Intermediate",
      "Expert",
    ],
  },
  {
    name: "jobType", // ✅ Added unique 'name'
    label: "Job Type",
    placeholder: "Enter Job Type",
    options: [
      "Full Time",
      "Part Time",
      "Contract",
      "Freelance",
      "Internship",
    ],
  },
  {
    name: "location", 
    label: "Location",
    placeholder: "Enter Job Location",
    options: [
      "Delhi",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
    ],
  },
  {
    name: "packageOffered", 
    label: "Salary",
    placeholder: "Enter Salary",
    options: [
      "10 LPA",
      "15 LPA",
      "20 LPA",
      "25 LPA",
      "30 LPA",
      "35 LPA",
      "40 LPA",
      "45 LPA",
    ],
  },
];

const content = `
  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    About the Job
  </h3>
  <p style="font-size: 16px; line-height: 1.6;">
    Write a compelling job description here that highlights the role, company culture, and expectations.
  </p>

  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    Key Responsibilities
  </h3>
  <ul style="padding-left: 20px; font-size: 16px; line-height: 1.6;">
    <li>Define and list key job responsibilities clearly.</li>
    <li>Ensure clarity on daily tasks and duties.</li>
    <li>Specify any leadership or collaboration expectations.</li>
  </ul>

  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    Qualifications & Skills
  </h3>
  <ul style="padding-left: 20px; font-size: 16px; line-height: 1.6;">
    <li>Detail the educational qualifications required.</li>
    <li>Mention relevant skills (technical, soft skills, etc.).</li>
    <li>Include any necessary certifications or experiences.</li>
  </ul>

  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    Preferred Qualifications
  </h3>
  <ul style="padding-left: 20px; font-size: 16px; line-height: 1.6;">
    <li>Additional experience or skills that would be a plus.</li>
    <li>Familiarity with industry tools or software.</li>
  </ul>

  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    Compensation & Benefits
  </h3>
  <p style="font-size: 16px; line-height: 1.6;">
    Provide details on salary range, benefits (healthcare, bonuses, flexible work options, etc.).
  </p>

  <h3 style="color:#2c3e50; font-size: 24px; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">
    How to Apply
  </h3>
  <p style="font-size: 16px; line-height: 1.6;">
    Explain the application process (submit resume, cover letter, portfolio, etc.).  
    Include a call to action: <strong>“Click ‘Apply Now’ to submit your application!”</strong>
  </p>
`;
export { fields, content };
