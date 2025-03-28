import { forwardRef, useState } from "react";
import {
  IconChevronRight,
  IconFileCv,
  IconLogout2,
  IconMessageCircle,
  IconMoon,
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
import { useNavigate } from "react-router-dom";0   

import {useDispatch} from 'react-redux'
import {removeUser} from '../../Slices/UserSlice'

interface UserProps {
  image?: string; // Optional image
  name: string;
  email: string;
}

interface UserButtonProps extends UserProps {
  icon?: React.ReactNode;
}

const UserButton = forwardRef<
  HTMLButtonElement,
  UserButtonProps
>(({ image, name, email, icon, ...others }, ref) => (
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
        src={image || "/avatar.png"} // Default avatar if none is provided
        radius="xl"
      />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {name || "Guest User"}
        </Text>

        <Text c="dimmed" size="xs">
          {email || "No email available"}
        </Text>
      </div>

      {icon || <IconChevronRight size={16} />}
    </Group>
  </UnstyledButton>
));

const ProfileMenu = ({ image, name, email }: UserProps) => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () =>{
    dispatch(removeUser());
  }

  return (
    <Menu opened={opened} onChange={setOpened}>
      <Menu.Target>
        <UserButton image={image} name={name} email={email} />
      </Menu.Target>
      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Menu.Item leftSection={<IconUserCircle size={20} />} onClick={() => navigate("/profile")}>
          Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={18} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconFileCv size={18} />}>Resume</Menu.Item>

        <Menu.Item
          leftSection={<IconMoon size={18} />}
          rightSection={
            <Switch
              size="sm"
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item color="red" onClick={onLogout} leftSection={<IconLogout2 size={18} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
