import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useState,useEffect } from "react";
// import UserButton from "./UserButton";
import { Bell } from "lucide-react";
import { Button, Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import {useSelector, useDispatch} from 'react-redux';
import { setProfile } from "../../Slices/ProfileSlice";
import { getProfile } from "../../Services/ProfileService";

const Header = () => {
  
  const location = useLocation();
  const user = useSelector((state:any)=>state.user)
  const profile = useSelector((state:any) => state.profile)
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(profile?.picture);
  const role = user?.accountType;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile.picture && user.id) {
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
      }
    };
    fetchProfile();
  }, []);

useEffect(() => {
  setProfilePic(profile?.picture);
}, [profile?.picture]); // Re-renders when profile picture updates
  
  return (
    location.pathname !== "/auth" && (
      <div className="w-full flex h-22 text-white justify-between p-5 items-center bg-[#040611]">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {/* Header options */}
        <NavLinks role={role} />
        {/* switch - delete later */}
        
        {/* Profile */}
        <div className="flex gap-7 items-center">
          <Indicator
            color="green"
            size={10}
            processing
          >
            <Bell
              size={28}
              className="cursor-pointer"
            />
          </Indicator>
          {user ? (
            <ProfileMenu
  image={profilePic ? `data:image/jpeg;base64,${profilePic}` : "/avatar.png"}
  name={user.name}
  email={user.email}
/>
          ) : (
            <Link to="/auth?mode=login">
              <Button variant="light">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
};

export default Header;
