import {
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ImagePlus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfileImage,
} from "../../Services/ProfileService";
import {
  changeProfile,
  setProfile,
} from "../../Slices/ProfileSlice";
import ProfileAbout from "./ProfileAbout";
import ProfileCertificate from "./ProfileCertificate";
import ProfileExperience from "./ProfileExperience";
import ProfileInfo from "./ProfileInfo";
import ProfileSkills from "./ProfileSkills";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(user.id);
        dispatch(setProfile(res.data));
        if (res.data.picture) setImagePreview(res.data.picture);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [dispatch, user.id]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('File not recieved');
      
      return
    };

    setImagePreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("image", file);
      
      const res = await updateProfileImage(formData);
      dispatch(changeProfile(res));

      notifications.show({
        title: "Profile Picture Updated",
        message: "Your profile picture was updated successfully!",
        color: "greenTheme.5",
      });
    } catch (err) {
      console.error("Error updating profile image:", err);
      notifications.show({
        title: "Update Failed",
        message: "Something went wrong while updating your profile picture.",
        color: "red.7",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 my-10 max-w-screen-lg mx-auto">
    {/* Profile Section */}
    <div className="flex flex-col items-center md:flex-row gap-6 md:items-end md:mt-0 ">
      {/* Profile Image */}
      <div className="relative w-28 sm:w-36 mt-4 aspect-square mx-auto md:mx-0">
        <div
          className={`w-full h-full rounded-full overflow-hidden shadow-md ${
            isDark ? "bg-[#040611]" : "bg-gray-200"
          } border-[4px] border-white`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <ImagePlus className="w-full h-full p-8 text-gray-400" />
          )}
        </div>
  
        {/* Edit Button */}
        <label
          htmlFor="profile-img-upload"
          className="absolute bottom-1.5 right-1.5 w-8 h-8 sm:w-9 sm:h-9 bg-green-500 border-[3px] border-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-green-600 transition"
        >
          <Pencil size={18} color="black" />
          <input
            id="profile-img-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      </div>
  
      {/* Profile Info */}
      <div className="flex-1">
        <ProfileInfo />
      </div>
    </div>
  
    {/* Profile Sections */}
    <Divider size="xs" className="mt-10" />
    <ProfileAbout />
    <Divider size="xs" className="mt-10" />
    <ProfileSkills />
    <Divider size="xs" className="mt-10" />
    <ProfileExperience />
    <Divider size="xs" className="mt-10" />
    <ProfileCertificate />
  </div>
  
  );
};

export default Profile;
