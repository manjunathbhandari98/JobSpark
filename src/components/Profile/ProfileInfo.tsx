import {
  ActionIcon,
  Button,
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
import { log } from "console";

const ProfileInfo = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const user = useSelector(
    (state: any) => state.user
  );
  const profile = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();

  // Define Forms
  const form = useForm({
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
    },
  });

  const userForm = useForm({
    initialValues: {
      name: "",
    },
  });

  // Handle Edit
  const handleEdit = () => {
    form.setValues({
      jobTitle: profile?.jobTitle || "",
      company: profile?.company || "",
      location: profile?.location || "",
    });

    userForm.setValues({
      name: user?.name || "",
    });

    setEdit(true);
  };

  // Handle Save
  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...userForm.values,
    };
    const updatedProfile = {
      ...profile,
      ...form.values,
    };
    console.log(updatedUser)
    dispatch(changeProfile(updatedProfile));
    dispatch(setUser(updatedUser));

    notifications.show({
      title: "Success",
      message: "Profile Updated Successfully",
      color: "greenTheme.5",
    });

    setEdit(false);
  };

  return (
    <div className="flex">
      {edit ? (
        <div className="flex flex-col w-full gap-5">
          <TextInput
            label="Full Name"
            {...userForm.getInputProps("name")}
          />
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput
              form={form}
              name="jobTitle"
              {...select[0]}
            />
            <SelectInput
              form={form}
              name="company"
              {...select[1]}
            />
          </div>
          <SelectInput
            form={form}
            name="location"
            {...select[2]}
          />
          <div className="flex gap-5">
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
        <div className="flex w-full justify-between">
          <div className="[&>*]:flex [&>*]:gap-2 space-y-2">
            <div className="font-bold text-3xl">
              {user?.name}
            </div>
            <div className="text-xl">
              <Briefcase />
              <div>{profile?.jobTitle}</div>
              <Dot />
              <div>{profile?.company}</div>
            </div>
            <div className="text-xl">
              <MapPin />
              <div>{profile?.location}</div>
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
