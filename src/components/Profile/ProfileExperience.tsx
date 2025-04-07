import {
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconPlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Experience from "./Experience";
import ExpInput from "./ExpInput";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../../Services/ProfileService";

const ProfileExperience = () => {
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);
  const [addExp, setAddExp] = useState(false);
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const experiences = profile?.experiences || [];
  const dispatch = useDispatch();

  const handleSave = async (
    updatedExperience: any,
    index: number | null
  ) => {
    const updatedExperiences = [...experiences];

    if (index !== null) {
      updatedExperiences[index] =
        updatedExperience;
    } else {
      updatedExperiences.push(updatedExperience);
    }

    const updatedProfile = {
      ...profile,
      experiences: updatedExperiences,
    };

    try {
      const response = await updateProfile(
        updatedProfile
      ); // ✅ wait and get data
      dispatch(changeProfile(response.data)); // ✅ use actual updated profile

      notifications.show({
        title: "Experience updated",
        message: "Experience has been updated",
        color: "green.8",
      });
    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to update experience",
        color: "red.8",
      });
    }

    setEditingIndex(null);
    setAddExp(false);
  };



  const handleDelete = async (index: number) => {
    const updatedExperiences = experiences.filter(
      (_: any, i: number) => i !== index
    );

    try {
      const response = await updateProfile({
        ...profile,
        experiences: updatedExperiences,
      });
      dispatch(changeProfile(response.data));
      notifications.show({
        title: "Experience deleted",
        message: "Experience has been deleted",
        color: "red.8",
      });
    } catch (error) {
      console.error(
        "Error deleting experience:",
        error
      );
      notifications.show({
        title: "Error",
        message: "Failed to delete experience",
        color: "red.8",
      });
    }
  };

  return (
    <div className="pt-5 space-y-5">
      <div className="font-bold text-2xl flex justify-between">
        Experience
        <Tooltip
          label="Add Experience"
          withArrow
        >
          <ActionIcon
            variant="filled"
            size="lg"
            onClick={() => setAddExp(true)}
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Tooltip>
      </div>

      {experiences.map(
        (data: any, index: number) => (
          <div
            key={index}
            className="p-4 rounded-lg"
          >
            {editingIndex === index ? (
              <ExpInput
                initialValues={data}
                onSave={(
                  updatedExperience: any
                ) =>
                  handleSave(
                    updatedExperience,
                    index
                  )
                }
                onCancel={() =>
                  setEditingIndex(null)
                }
              />
            ) : (
              <div className="flex justify-between items-start gap-3">
                <Experience {...data} />
                <div className="flex gap-3 ml-4">
                  <Tooltip
                    label="Edit"
                    withArrow
                  >
                    <ActionIcon
                      variant="light"
                      size="lg"
                      color="blue"
                      onClick={() =>
                        setEditingIndex(index)
                      }
                    >
                      <IconPencil size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip
                    label="Delete"
                    withArrow
                  >
                    <ActionIcon
                      variant="light"
                      size="lg"
                      color="red"
                      onClick={() =>
                        handleDelete(index)
                      }
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        )
      )}

      {addExp && (
        <ExpInput
          onSave={(newExperience: any) =>
            handleSave(newExperience, null)
          }
          onCancel={() => setAddExp(false)}
        />
      )}
    </div>
  );
};

export default ProfileExperience;
