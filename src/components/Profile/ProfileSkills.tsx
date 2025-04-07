import {
  ActionIcon,
  TagsInput,
  Tooltip,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../../Services/ProfileService";

const ProfileSkills = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      skills: profile?.skills || [], // Ensure default empty array
    },
  });

  // Handle Edit (Loads current data)
  const handleEdit = () => {
    form.setValues({
      skills: profile?.skills || [],
    });
    setEdit(true);
  };

  // Handle Save (Updates Redux store)
  const handleSave = async() => {
    const updatedProfile = {
      ...profile,
      skills: form.values.skills || [], // Prevent undefined errors
    };
    try {
      await updateProfile(
        updatedProfile
      ); // Get the updated profile from API
      // Use updated version from backend (if backend modified anything)
      dispatch(changeProfile(updatedProfile));
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "greenTheme.5",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update skills",
        color: "red.5",
      });
      return;
      
    }
    setEdit(false);
  };

  // Handle Discard (Cancels edit mode)
  const handleDiscard = () => {
    setEdit(false);
  };

  return (
    <div className="pt-5 space-y-5">
      <div className="font-bold text-2xl flex justify-between">
        Skills
        {!edit && (
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
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {edit ? (
          <TagsInput
            withAsterisk
            label="Skills"
            clearable
            acceptValueOnBlur
            {...form.getInputProps("skills")}
          />
        ) : profile?.skills?.length > 0 ? (
          profile.skills.map(
            (skill: string, index: number) => (
              <div
                key={index}
                className="bg-green-500/8 px-2 py-1 rounded-2xl"
              >
                {skill}
              </div>
            )
          )
        ) : (
          <p>No skills added.</p>
        )}
      </div>

      {edit && (
        <div className="flex gap-5 mt-4">
          <Button
            variant="filled"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outline"
            color="red.8"
            onClick={handleDiscard}
          >
            Discard
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSkills;
