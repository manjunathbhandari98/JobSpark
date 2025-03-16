import {
  ActionIcon,
  Button,
  Divider,
} from "@mantine/core";
import { Bookmark } from "lucide-react";
import {
  card,
  desc,
  skills,
} from "../../data/JobDescData"; 
import { Link, useNavigate } from "react-router-dom";

const JobDesc = (props:any) => {
  const navigate = useNavigate();
  return (
    <div className="w-2/3 py-2 px-3">
      {/* role,company,apply */}
      <div className="flex justify-between py-4">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-700 rounded-xl p-2">
            <img
              src="/Icons/Google.png"
              alt="logo"
              className="h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-xl">
              Data Analyst
            </div>
            <div className="text-sm">
              Google &bull; 1 month ago &bull; 100
              Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {props.edit ? (
            <>
              <Link to="/job-apply">
                <Button
                  size="sm"
                  variant="light"
                  color="greenTheme.5"
                >
                  Edit
                </Button>
              </Link>
              <Link to="/job-apply">
                <Button
                  size="sm"
                  variant="outline"
                  color="red.5"
                >
                  Delete
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/job-apply">
                <Button
                  size="sm"
                  variant="light"
                  color="greenTheme.5"
                >
                  Apply
                </Button>
              </Link>

              <Bookmark />
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* location, experience, salary, jobtype */}
      <div className="flex justify-between my-6">
        {card.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center text-center"
          >
            <ActionIcon
              color="greenTheme.5"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label="settings"
            >
              <data.icon
                className="w-4/5 h-4/5"
                stroke={1.3}
              />
            </ActionIcon>
            <div className="text-sm">
              {data.name}
            </div>
            <div className="font-medium">
              {data.value}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Required Skills */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          Required Skill
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-green-500/8 text-green-500 px-2 py-1 rounded-full"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* About Job */}
      <div className="py-4 flex flex-col gap-3">
        <div className="text-2xl font-semibold">
          About Job
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
          className="space-y-4 text-gray-300 [&>h4]:text-lg [&>h4]:font-semibold [&>ul]:list-disc [&>ul]:pl-6 [&>p]:text-base"
        />
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* About Company */}
      <div className="py-4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">
          About Company
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-700 rounded-xl p-2">
              <img
                src="/Icons/Google.png"
                alt="logo"
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-lg">
                Google
              </div>
              <div className="text-sm">
                10k+ Employees
              </div>
            </div>
          </div>
          <div>
            <Button
              size="sm"
              variant="light"
              color="greenTheme.5"
              onClick={() => navigate("/company")}
            >
              Company Page
            </Button>
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Natus maiores possimus
          fuga nulla deleniti assumenda hic neque
          debitis, quia enim corrupti accusamus
          suscipit distinctio, aspernatur
          laboriosam consequatur voluptatibus
          repudiandae cupiditate, rerum illum
          reprehenderit accusantium necessitatibus
          explicabo. Ad doloremque dolorem,
          consequuntur cum ab architecto rem
          optio.
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
