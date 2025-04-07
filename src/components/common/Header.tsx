import {
  Link,
  useLocation,
} from "react-router-dom";
import Logo from "../../assets/Logo";
import { Button } from "@mantine/core";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import useImage from "../../hooks/useImage";
import { useEffect, useState } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotificationsMenu from "./NotificationsMenu";
import { getNotifications } from "../../Services/NotificationService";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(
    (state: any) => state.user
  );
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const [notifications, setNotifications] =
    useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications(
        user.id
      );
      setNotifications(response.data);
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id && !profile) {
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
    }
  }, [dispatch, user?.id, profile]);

  const imageSource = useImage(profile?.picture);

  if (location.pathname === "/auth") return null;

  return (
    <div className="w-full flex h-22 text-white justify-between p-5 items-center bg-[#040611]">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <NavLinks role={user?.accountType} />

      <div className="flex gap-7 items-center">
        <NotificationsMenu
          notifications={notifications}
          refreshNotifications={
            fetchNotifications
          }
        />
        {user ? (
          <ProfileMenu
            image={imageSource}
            name={user.name}
            email={user.email}
          />
        ) : (
          <Link to="/auth?mode=login">
            <Button variant="light">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
