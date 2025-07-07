import {
  Avatar,
  Group,
  Menu,
  Switch,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronRight,
  IconFileCv,
  IconLogout2,
  IconMessageCircle,
  IconMoon,
  IconUserCircle,
} from "@tabler/icons-react";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../App/Store";
import { removeToken } from "../../Slices/JWTSlice";
import { toggleTheme } from "../../Slices/ThemeSlice";
import { removeUser } from "../../Slices/UserSlice";

interface UserProps {
  image?: string;
  name: string;
  email: string;
}

interface UserButtonProps extends UserProps {
  icon?: React.ReactNode;
}

const UserButton = forwardRef<
  HTMLButtonElement,
  UserButtonProps
>(
  (
    { image, name, email, icon, ...others },
    ref
  ) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar
          src={image || "/avatar.png"}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text
            size="sm"
            fw={500}
          >
            {name || "Guest User"}
          </Text>
          <Text
            c="dimmed"
            size="xs"
          >
            {email || "No email available"}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const ProfileMenu = ({
  image,
  name,
  email,
}: UserProps) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(removeUser());
    dispatch(removeToken());
  };
  const colorScheme = useSelector(
      (state: RootState) => state.theme.colorScheme
    );

  // Detect if it's mobile
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <UnstyledButton
        onClick={() =>
          navigate("/profile-options")
        }
        className="w-full text-left"
      >
        <UserButton
          image={image}
          name={name}
          email={email}
        />
      </UnstyledButton>
    );
  }

  // Normal dropdown for desktop
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <UserButton
          image={image}
          name={name}
          email={email}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconUserCircle size={20} />
          }
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle size={18} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={<IconFileCv size={18} />}
        >
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoon size={18} />}
          rightSection={
             <Switch
                          checked={colorScheme === "dark"}
                          onChange={() =>
                            dispatch(toggleTheme())
                          }
                          size="sm"
                        />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={onLogout}
          leftSection={<IconLogout2 size={18} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
