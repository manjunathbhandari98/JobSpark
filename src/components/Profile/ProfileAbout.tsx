import {
  ActionIcon,
  Button,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";
import { Save } from "lucide-react";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";

const ProfileAbout = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector(
    (state: any) => state.profile
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

  const handleSave = () =>{
    const updatedProfile = {
        ...profile,
        about: form.getValues().about, // Get latest value
      };

      dispatch(changeProfile(updatedProfile));

      notifications.show({
        title: "Success",
        message: "Profile Updated Successfully",
        color: "greenTheme.5",
      });
      setEdit(false)
  }

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
