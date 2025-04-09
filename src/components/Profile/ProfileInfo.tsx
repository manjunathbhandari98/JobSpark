import {
  ActionIcon,
  Button,
  NumberInput,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  Briefcase,
  Dot,
  MapPin,
} from "lucide-react";
import fields from "../../data/Profile";
import SelectInput from "./SelectInput";
import { useState, useEffect } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { setUser } from "../../Slices/UserSlice";
import { updateProfile } from "../../Services/ProfileService";

const ProfileInfo = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const user = useSelector(
    (state: any) => state.user
  );
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(profile);
  }, []);

  const form = useForm({
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
      totalExperience: 0,
    },
  });

  const userForm = useForm({
    initialValues: {
      name: "",
    },
  });

  const handleEdit = () => {
    form.setValues({
      jobTitle: profile?.jobTitle || "",
      company: profile?.company || "",
      location: profile?.location || "",
      totalExperience:
        profile?.totalExperience || null,
    });

    userForm.setValues({
      name: user?.name || "",
    });

    setEdit(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      ...userForm.values,
    };
    const updatedProfile = {
      ...profile,
      ...form.values,
    };

    try {
      await updateProfile(updatedProfile);
      dispatch(changeProfile(updatedProfile));
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.log(error);
    }

    notifications.show({
      title: "Success",
      message: "Profile Updated Successfully",
      color: "greenTheme.5",
    });

    setEdit(false);
  };

  return (
    <div className="w-full">
      {edit ? (
        <div className="flex flex-col w-full gap-5">
          <TextInput
            label="Full Name"
            {...userForm.getInputProps("name")}
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div className="w-full md:w-1/2">
              <SelectInput
                form={form}
                name="jobTitle"
                {...select[0]}
              />
            </div>
            <div className="w-full md:w-1/2">
              <SelectInput
                form={form}
                name="company"
                {...select[1]}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div className="w-full md:w-1/2">
              <SelectInput
                form={form}
                name="location"
                {...select[2]}
              />
            </div>
            <div className="w-full md:w-1/2">
              <NumberInput
                hideControls
                withAsterisk
                label="Total Experience"
                {...form.getInputProps(
                  "totalExperience"
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outline"
              color="red.8"
              onClick={() => setEdit(false)}
            >
              Discard
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:items-start">
          <div className="[&>*]:flex [&>*]:gap-2 space-y-2 text-gray-800 dark:text-white">
            <div className="font-bold text-2xl sm:text-3xl">
              {user?.name}
            </div>

            <div className="text-lg sm:text-xl flex flex-wrap items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>{profile?.jobTitle}</span>
              <Dot className="w-5 h-5" />
              <span>{profile?.company}</span>
            </div>

            <div className="text-lg sm:text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{profile?.location}</span>
            </div>

            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>
                Experience:{" "}
                {profile?.totalExperience} Years
              </span>
            </div>
          </div>

          <Tooltip
            label="Edit"
            withArrow
          >
            <ActionIcon
              variant="light"
              size="lg"
              color="green"
              onClick={handleEdit}
              className="self-start"
            >
              <IconPencil size={20} />
            </ActionIcon>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
