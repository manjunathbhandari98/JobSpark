import {
  ActionIcon,
  Button,
  Divider,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import Experience from "./Experience";
import {
  Briefcase,
  Dot,
  MapPin,
  Save,
} from "lucide-react";
import Certification from "./Certification";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../data/Profile";
import ExpInput from "./ExpInput";
import CertificateInput from "./CertificateInput";

const Profile = (props: any) => {
  const [edit, setEdit] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [about, setAbout] = useState(props.about);
  const [skills, setSkills] = useState([...props.skills])
  const [experience, setExperience] = useState(props.experience)
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
    console.log(edit);
  };

  const select = fields;

  return (
    <div className="my-10 w-4/5 mx-auto">
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
          {edit[0] ? (
            <div className="flex flex-col gap-5 ">
              <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput {...select[0]} />
                <SelectInput {...select[1]} />
              </div>
              <SelectInput {...select[2]} />
            </div>
          ) : (
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
          )}

          {/* Edit Button */}

          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={() => handleEdit(0)}
          >
            {!edit[0] ? (
              <IconPencil size={45} />
            ) : (
              <Save size={45} />
            )}
          </ActionIcon>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* about */}
        <div className="pt-5 space-y-5">
          <div className="font-bold text-2xl flex justify-between">
            About
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => handleEdit(1)}
            >
              {!edit[1] ? (
                <IconPencil size={45} />
              ) : (
                <Save size={45} />
              )}
            </ActionIcon>
          </div>
          <div>
            {edit[1] ? (
              <>
                <Textarea
                  withAsterisk
                  label="About"
                  autosize
                  minRows={3}
                  value={about}
                  onChange={(e) =>
                    setAbout(e.target.value)
                  }
                />
              </>
            ) : (
              about
            )}
          </div>
        </div>

        <Divider
          size="xs"
          className="mt-10"
        />

        {/* skills */}
        <div className="pt-5 space-y-5">
          <div className="font-bold text-2xl flex justify-between">
            Skills
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => handleEdit(2)}
            >
              {!edit[2] ? (
                <IconPencil size={45} />
              ) : (
                <Save size={45} />
              )}
            </ActionIcon>
          </div>
          <div className="flex flex-wrap gap-3">
            {edit[2] ? (
              <TagsInput
                withAsterisk
                label="Skills"
                value={skills}
                onChange={setSkills}
                clearable
                acceptValueOnBlur
              />
            ) : (
              skills.map(
                (
                  skill: string,
                  index: number
                ) => (
                  <div key={index}>
                    <div className="bg-green-500/8 px-2 py-1 rounded-2xl">
                      {skill}
                    </div>
                  </div>
                )
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
            <div className="font-bold text-2xl flex justify-between">
              Experience
              <div className="flex gap-3">
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => setAddExp(true)}
                >
                  <IconPlus size={45} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => handleEdit(3)}
                >
                  {!edit[3] ? (
                    <IconPencil size={45} />
                  ) : (
                    <Save size={45} />
                  )}
                </ActionIcon>
              </div>
            </div>
            {experience.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Experience
                    {...data}
                    edit={edit[3]}
                  />
                </div>
              )
            )}
            {addExp && (
              <ExpInput
                addExp
                setEdit={setAddExp}
              />
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
            <div className="font-bold text-2xl flex justify-between">
              Certificate
              <div className="flex gap-4">
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() =>
                    setAddCerti(true)
                  }
                >
                  <IconPlus size={45} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => handleEdit(4)}
                >
                  {!edit[4] ? (
                    <IconPencil size={45} />
                  ) : (
                    <Save size={45} />
                  )}
                </ActionIcon>
              </div>
            </div>
            {props.certifications?.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Certification
                    {...data}
                    edit={edit[4]}
                    addCerti={addCerti}
                    setEdit={() => handleEdit(4)}
                  />
                </div>
              )
            )}

            {addCerti && (
              <CertificateInput
                addCerti
                setEdit={setAddCerti}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
