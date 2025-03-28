import { Divider } from "@mantine/core";
import Profile from "../components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";


const ProfilePage = () => {
 

  return (
    <div className="py-5">
      <Divider />
      <Profile />
    </div>
  );
};

export default ProfilePage;
