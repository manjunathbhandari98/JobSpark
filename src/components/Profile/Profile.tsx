import {
  FileInput,
  Divider,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import {
  changeProfile,
  setProfile,
} from "../../Slices/ProfileSlice";
import ProfileInfo from "./ProfileInfo";
import ProfileAbout from "./ProfileAbout";
import ProfileSkills from "./ProfileSkills";
import ProfileExperience from "./ProfileExperience";
import ProfileCertificate from "./ProfileCertificate";
import { notifications } from "@mantine/notifications";

const Profile = () => {
  const profile = useSelector(
    (state: any) => state.profile
  );
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(
          user.id
        );
        dispatch(setProfile(response.data));
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error
        );
      }
    };
    fetchProfile();
  }, [dispatch, user.id]);

  const handleFileChange = async (image: any) => {
    const img: any = await getBase64(image);
    const base64Data = img.split(",")[1];
    const updatedImg = {
      ...profile,
      picture: base64Data,
    };
    dispatch(changeProfile(updatedImg));
    notifications.show({
      title: "Profile Picture Updated",
      message:
        "Your profile picture has been updated successfully",
      color: "greenTheme.5",
      icon: true,
    });
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getImageSource = () => {
    if (profile.picture) {
      try {
        const base64String = `data:image/jpeg;base64,${profile.picture}`;
        return base64String;
      } catch (error) {
        console.error(
          "Error generating image source:",
          error
        );
        return "/avatar.png";
      }
    }
    return "/avatar.png";
  };

  return (
    <div className="my-10 w-4/5 mx-auto">
      <div className="mb-1">
        <div className="relative mb-20">
          <img
            src="/Profile/banner.jpg"
            alt="banner"
            className="rounded-t-3xl"
          />
          <div className="top-22 left-5 absolute p-2 dark:bg-[#040611] light:bg-white rounded-full">
            <div className="relative w-44 h-44 e-profile">
              <div className="e-custom-wrapper w-full h-full rounded-full overflow-hidden shadow-md">
                <img
                  src={getImageSource()}
                  alt="Profile Avatar"
                  id="custom-img"
                />
              </div>
              <FileInput
                id="img-upload"
                className="hidden"
                accept="image/*" // Accept all image types
                onChange={handleFileChange}
              />
              <span
                id="custom-edit"
                className="e-custom-edit absolute bottom-2 right-2 w-10 h-10 bg-green-500 border-[3px] border-black rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-green-600 transition"
                onClick={() =>
                  document
                    .getElementById("img-upload")
                    ?.click()
                }
              >
                <IconPencil
                  size={22}
                  color="black"
                />
              </span>
            </div>
          </div>
        </div>
        <ProfileInfo />
        <Divider
          size="xs"
          className="mt-10"
        />
        <ProfileAbout />
        <Divider
          size="xs"
          className="mt-10"
        />
        <ProfileSkills />
        <Divider
          size="xs"
          className="mt-10"
        />
        <ProfileExperience />
        <Divider
          size="xs"
          className="mt-10"
        />
        <ProfileCertificate />
      </div>
    </div>
  );
};

export default Profile;
