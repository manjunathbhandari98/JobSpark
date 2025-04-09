import {
  Menu,
  Text,
  UnstyledButton,
  Group,
  ScrollArea,
  Box,
  Divider,
  Button,
  Indicator,
  Stack,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { markNotificationsAsRead } from "../../Services/NotificationService";

interface Notification {
  id: number;
  userId: number;
  message: string;
  action?: string;
  timeStamp: string;
  notificationStatus?: boolean;
  route?: string;
}

interface NotificationsMenuProps {
  notifications: Notification[];
  refreshNotifications: () => void;
}

const NotificationsMenu = ({
  notifications,
  refreshNotifications,
}: NotificationsMenuProps) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleMarkAsRead = async (
    userId: number,
    notificationId: number
  ) => {
    try {
      await markNotificationsAsRead(
        userId,
        notificationId
      );
      refreshNotifications();
      setOpened(false);
    } catch (error) {
      console.error(
        "Failed to mark notification as read",
        error
      );
    }
  };

  const handleNavigate = async (
    userId: number,
    notificationId: number,
    route: string
  ) => {
    await handleMarkAsRead(
      userId,
      notificationId
    );
    navigate(route);
    setOpened(false);
  };

  return (
    <Menu
      width={320}
      shadow="md"
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
    >
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Indicator
              color="green"
              size={10}
              processing
              disabled={
                !notifications.some(
                  (n) => !n.notificationStatus
                )
              }
            >
              <Bell
                onClick={refreshNotifications}
                size={28}
                className="cursor-pointer"
              />
            </Indicator>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Text
          size="sm"
          fw={600}
          px="sm"
          pt="xs"
        >
          Notifications
        </Text>
        <Divider my="xs" />

        {notifications.length === 0 ? (
          <Text
            size="xs"
            c="dimmed"
            px="sm"
          >
            No notifications
          </Text>
        ) : (
          <ScrollArea h={250}>
            {[...notifications]
              .sort(
                (a, b) =>
                  new Date(
                    b.timeStamp
                  ).getTime() -
                  new Date(a.timeStamp).getTime()
              )
              .map((notification) => (
                <Box
                  key={notification.id}
                  px="sm"
                  py={6}
                >
                  <Group
                    align="flex-start"
                    justify="space-between"
                    wrap="wrap"
                    gap="sm"
                  >
                    <Box
                      style={{
                        flex: 1,
                        minWidth: "70%",
                      }}
                    >
                      {notification.route ? (
                        <Text
                          size="sm"
                          fw={500}
                          style={{
                            cursor: "pointer",
                            textDecoration:
                              "underline",
                            wordBreak:
                              "break-word",
                          }}
                          onClick={() =>
                            handleNavigate(
                              notification.userId,
                              notification.id,
                              notification.route!
                            )
                          }
                        >
                          {notification.action}
                        </Text>
                      ) : (
                        <Text
                          size="sm"
                          fw={500}
                          style={{
                            wordBreak:
                              "break-word",
                          }}
                        >
                          {notification.action}
                        </Text>
                      )}
                      <Text
                        size="xs"
                        c="dimmed"
                        style={{
                          wordBreak: "break-word",
                        }}
                      >
                        {notification.message}
                      </Text>
                    </Box>

                    {notification.notificationStatus && (
                      <Button
                        onClick={() =>
                          handleMarkAsRead(
                            notification.userId,
                            notification.id
                          )
                        }
                        size="xs"
                        variant="light"
                        leftSection={
                          <IconCheck size={14} />
                        }
                        style={{ flexShrink: 0 }}
                      >
                        Read
                      </Button>
                    )}
                  </Group>
                  <Text
                    size="xs"
                    c="dimmed"
                    mt={4}
                  >
                    {new Date(
                      notification.timeStamp
                    ).toLocaleString()}
                  </Text>
                  <Divider my="sm" />
                </Box>
              ))}
          </ScrollArea>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationsMenu;
