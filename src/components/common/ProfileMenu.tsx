import { forwardRef, useState } from "react";
import {
  IconChevronRight,
  IconFileCv,
  IconLogout2,
  IconMessageCircle,
  IconMoon,
  IconMoonStars,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconSun,
  IconTrash,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Switch,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
interface UserButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<
  HTMLButtonElement,
  UserButtonProps
>(
  (
    {
      image,
      name,
      email,
      icon,
      ...others
    }: UserButtonProps,
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
          src={image}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text
            size="sm"
            fw={500}
          >
            {name}
          </Text>

          <Text
            c="dimmed"
            size="xs"
          >
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const ProfileMenu = () => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      <Menu.Dropdown
        onChange={() => setOpened(true)}
      >
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
              size="sm"
              checked={checked}
              onChange={(event) => {
                setChecked(
                  event.currentTarget.checked
                );
              }}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={18} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
