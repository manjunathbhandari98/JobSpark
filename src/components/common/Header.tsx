import {
  Link,
  useLocation,
} from "react-router-dom";
import Logo from "../../assets/Logo";
import { Button, Drawer, useMantineColorScheme } from "@mantine/core";
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
import { Menu } from "lucide-react"; // Hamburger icon

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
  const [drawerOpened, setDrawerOpened] =
    useState(false);

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

   const { colorScheme } = useMantineColorScheme(); 
    const isDark = colorScheme === "dark";
  const imageSource = useImage(profile?.picture);
  if (location.pathname.startsWith("/auth"))
    return null;



  return (
    <div
      className={`w-full flex justify-between ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      } p-5 items-center relative`}
    >
      {/* Left Side: Logo + Notification */}
      <div className="flex items-center gap-8">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex md:hidden">
          <NotificationsMenu
            notifications={notifications}
            refreshNotifications={
              fetchNotifications
            }
          />
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 font-bold">
        <NavLinks role={user?.accountType} />
      </div>

      {/* Desktop Right-side Actions (Profile/Login) */}
      <div className="hidden md:flex items-center gap-6">
        <div className="md:flex hidden">
          <NotificationsMenu
            notifications={notifications}
            refreshNotifications={
              fetchNotifications
            }
          />
        </div>
        {user ? (
          <ProfileMenu
            image={imageSource}
            name={user?.name}
            email={profile?.email}
          />
        ) : (
          <Link to="/auth?mode=login">
            <Button variant="light">Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Menu
          size={28}
          onClick={() => setDrawerOpened(true)}
          className="cursor-pointer"
        />
      </div>

      {/* Side Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={<Logo />}
        padding="md"
        size="xs"
        position="right"
        overlayProps={{ blur: 3 }}
        withCloseButton
      >
        {/* Full height, flex layout */}
        <div className="flex flex-col h-[85dvh]">
          {/* Scrollable nav content */}
          <div className="flex-grow">
            <NavLinks
              role={user?.accountType}
              direction="vertical"
              onNavigate={() =>
                setDrawerOpened(false)
              }
            />
          </div>

          {/* Bottom sticky login/profile section */}
          <div
            className="pt-4"
            onClick={() => setDrawerOpened(false)}
          >
            {user ? (
              <ProfileMenu
                image={imageSource}
                name={user?.name}
                email={profile?.email}
              />
            ) : (
              <Link to="/auth?mode=login">
                <Button
                  fullWidth
                  variant="light"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
