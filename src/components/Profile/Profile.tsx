import {
  FileInput,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  getProfile,
  updateProfile,
} from "../../Services/ProfileService";
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
import useImage from "../../hooks/useImage";

const Profile = () => {
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state.user
  );
  const imageSource = useImage(profile?.picture);

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
    try {
      const img: any = await getBase64(image);
      const base64Data = img.split(",")[1];
      const updatedImg = {
        ...profile,
        picture: base64Data,
      };
      const response = await updateProfile(
        updatedImg
      );
      dispatch(changeProfile(response.data));
      notifications.show({
        title: "Profile Picture Updated",
        message:
          "Your profile picture has been updated successfully",
        color: "greenTheme.5",
        icon: true,
      });
    } catch (error) {
      console.error(
        "Failed to update profile image:",
        error
      );
      notifications.show({
        title: "Error",
        message:
          "Failed to update profile picture",
        color: "red.7",
      });
    }
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

     const { colorScheme } = useMantineColorScheme(); 
      const isDark = colorScheme === "dark";

  return (
    <div className="px-4 sm:px-6 md:px-10 my-10 max-w-screen-lg mx-auto">
      {/* Banner */}
      <div className=" mt-25">
        {/* <img
          src="/Profile/banner.jpg"
          alt="banner"
          className="w-full rounded-t-3xl object-cover max-h-[200px] sm:max-h-[280px]"
        /> */}

        {/* Profile Image + Info */}
        <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-24 md:mt-0 md:-translate-y-12">
          {/* Profile Image */}
          <div className="relative w-32 sm:w-44 h-32 sm:h-44 mx-auto md:mx-0">
            <div
              className={`w-full h-full rounded-full overflow-hidden shadow-md ${
                isDark
                  ? "bg-[#040611] text-gray-200"
                  : "bg-gray-200 text-black"
              } border-[4px]`}
              border-white
              bg-white
            >
              <img
                src={imageSource}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <FileInput
              id="img-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <span
              id="custom-edit"
              className="absolute bottom-2 right-2 w-9 h-9 sm:w-10 sm:h-10 bg-green-500 border-[3px] border-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-green-600 transition"
              onClick={() =>
                document
                  .getElementById("img-upload")
                  ?.click()
              }
            >
              <IconPencil
                size={20}
                color="black"
              />
            </span>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <ProfileInfo />
          </div>
        </div>

        {/* Other Sections */}
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
