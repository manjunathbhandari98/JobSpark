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
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Call parent function when notification disappears
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            ease: "easeInOut",
            duration: 0.4,
          }}
          className="fixed top-5 right-5 z-50"
        >
          <Notification
            icon={type === 'success' ? <IconCheck size={20} /> : <XIcon size={20}/>}
            color={`${type === 'success' ? 'teal' : 'red'}`}
            title={title}
            className="shadow-lg rounded-lg"
            {...props}
          >
            {message}
          </Notification>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBar;
