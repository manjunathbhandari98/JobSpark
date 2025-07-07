import {
  ActionIcon,
  Button,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { updateProfile } from "../../Services/ProfileService";
import { changeProfile } from "../../Slices/ProfileSlice";

const ProfileAbout = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      about: profile?.about || "",
    },
  });

  const handleEdit = () => {
   
      // Reset form values when toggling edit mode
      form.setValues({
        about: profile?.about || "",
      });
    
    setEdit(!edit);
  };

  const handleSave = async () => {
    const updatedProfile = {
      ...profile,
      about: form.values.about,
    };

    try {
     await updateProfile(
       updatedProfile
      ); 
      dispatch(changeProfile(updatedProfile)); // Use updated version from backend (if backend modified anything)

      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "greenTheme.5",
      });
      setEdit(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "redTheme.5",
      });
    }
  };


  return (
    <div className="pt-5 space-y-5">
      <div className="font-bold text-2xl flex justify-between">
        About
      </div>
      <div>
        {edit ? (
          <div className="flex flex-col gap-5">
            <Textarea
            withAsterisk
            label="About"
            autosize
            minRows={3}
            {...form.getInputProps("about")}
          />
          <div className="flex gap-4">
             <Button onClick={handleSave}>
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEdit(false)}
                        >
                          Discard
                        </Button>
          </div>
          </div>
          
        ) : (
          <div className="flex justify-between">
            <p>
              {profile?.about ||
                "No information provided."}
            </p>
            <Tooltip
              label="Edit"
              withArrow
            >
              <ActionIcon
                variant="light"
                size="lg"
                color="blue"
                onClick={handleEdit}
              >
                <IconPencil size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAbout;
