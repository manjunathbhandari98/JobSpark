import { useState, useEffect } from "react";
import { Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { XIcon } from "lucide-react";

// Define the props interface
interface NotificationBarProps {
  message?: string;
  title?: string;
  duration?: number;
  type?:string;
  onClose?: () => void; // Specify the type of onClose as a function
}

const NotificationBar: React.FC<NotificationBarProps> = ({
  message = "Everything is fine",
  title = "All good!",
  duration = 3000,
  type,
  onClose,
}) => {
  const [visible, setVisible] = useState(true); // Default visible

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null; // Prevent unmounting too fast

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="fixed top-5 right-5 z-50"
    >
      <Notification
        icon={type === 'success' ? <IconCheck size={20} /> : <XIcon size={20} />}
        color={type === 'success' ? 'teal' : 'red'}
        title={title}
        className="shadow-lg rounded-lg"
      >
        {message}
      </Notification>
    </motion.div>
  );
};


export default NotificationBar;
