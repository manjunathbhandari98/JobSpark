import { Button, Divider } from "@mantine/core";
import Experience from "./Experience";
import {
  Briefcase,
  Dot,
  MapPin,
} from "lucide-react";
import Certification from "./Certification";

const ProfileCard = (props: any) => {
  return (
    <div className="my-4 ">
      {/* Profile */}
      <div className="mb-16">
        {/* banner */}
        <div className="relative mb-28">
          <img
            src="/Profile/banner.jpg"
            alt="banner"
            className="rounded-t-3xl"
          />
          {/* profile image */}
          <div className="top-16 left-5 absolute p-2 dark:bg-[#040611] light:bg-white rounded-full">
            <img
              src="/avatar.png"
              alt=""
              className="h-45 rounded-full"
            />
          </div>
        </div>
        {/* profile info */}
        <div className="flex justify-between items-center">
          <div className="[&>*]:flex [&>*]:gap-2 space-y-2">
            <div className="font-bold text-3xl">
              {props.name}
            </div>
            <div className="text-xl">
              <Briefcase />
              <div>{props.role}</div>
              <Dot />
              <div>{props.company}</div>
            </div>
            <div className="text-xl">
              <MapPin />
              <div>{props.location}</div>
            </div>
            <div className="text-xl">
              <Briefcase />
              <div>Experience : 2 years</div>
            </div>
          </div>

          {/* message button */}
          <div>
            <Button
              color="green"
              variant="light"
              className="px-2 py-1"
            >
              Message
            </Button>
          </div>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* about */}
        <div className="pt-5 space-y-5">
          <div className="font-bold text-2xl">
            About
          </div>
          <div>{props.about}</div>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* skills */}
        <div className="pt-5 space-y-5">
          <div className="font-bold text-2xl">
            Skills
          </div>
          <div className="flex flex-wrap gap-3">
            {props.skills.map(
              (skill: string, index: number) => (
                <div key={index}>
                  <div className="bg-green-500/8 px-2 py-1 rounded-2xl">
                    {skill}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* Experience */}
        <div>
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              Experience
            </div>
            {props.experience.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Experience {...data} />
                </div>
              )
            )}
          </div>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* Certificate */}
        <div>
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              Certificate
            </div>
            {props.certifications.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Certification {...data} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
