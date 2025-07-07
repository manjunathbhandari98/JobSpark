import {
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Switch,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronRight,
  IconFileCv,
  IconLogout2,
  IconMessageCircle,
  IconMoon,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  useDispatch,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../Slices/JWTSlice";
import { toggleTheme } from "../../Slices/ThemeSlice";
import { removeUser } from "../../Slices/UserSlice";

const OptionRow = ({
  icon,
  label,
  rightSection,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  rightSection?: React.ReactNode;
  onClick?: () => void;
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box
      onClick={onClick}
      className="cursor-pointer px-3 py-3  rounded-md transition"
      style={{
        backgroundColor: isDark
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
      }}
    >
      <Group justify="space-between">
        <Group gap="sm">
          {icon}
          <Text c={isDark ? "gray.2" : "dark.7"}>
            {label}
          </Text>
        </Group>
        {rightSection ?? (
          <IconChevronRight
            size={18}
            color={
              isDark
                ? theme.colors.gray[4]
                : theme.colors.dark[4]
            }
          />
        )}
      </Group>
    </Box>
  );
};

const ProfileOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <Container
      size="xs"
      px="md"
      py="lg"
    >
      <Stack>
        <OptionRow
          icon={
            <IconUserCircle
              size={20}
              color={
                isDark
                  ? theme.colors.gray[2]
                  : theme.colors.dark[7]
              }
            />
          }
          label="Profile"
          onClick={() => navigate("/profile")}
        />

        <OptionRow
          icon={
            <IconMessageCircle
              size={20}
              color={
                isDark
                  ? theme.colors.gray[2]
                  : theme.colors.dark[7]
              }
            />
          }
          label="Messages"
          onClick={() => navigate("/messages")}
        />

        <OptionRow
          icon={
            <IconFileCv
              size={20}
              color={
                isDark
                  ? theme.colors.gray[2]
                  : theme.colors.dark[7]
              }
            />
          }
          label="Resume"
          onClick={() => navigate("/resume")}
        />

        <Divider my="xs" />

        <OptionRow
          icon={
            <IconMoon
              size={20}
              color={
                isDark
                  ? theme.colors.yellow[3]
                  : theme.colors.gray[7]
              }
            />
          }
          label="Dark Mode"
          rightSection={
            <Switch
              checked={colorScheme === "dark"}
              onChange={() =>
                dispatch(toggleTheme())
              }
              size="sm"
              color={isDark ? "green" : "gray"}
            />
          }
        />

        <Divider my="xs" />

        <OptionRow
          icon={
            <IconLogout2
              size={20}
              color={theme.colors.red[6]}
            />
          }
          label="Logout"
          onClick={handleLogout}
          rightSection={null}
        />
      </Stack>
    </Container>
  );
};

export default ProfileOptions;
