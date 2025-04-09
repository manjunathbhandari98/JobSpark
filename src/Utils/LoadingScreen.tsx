import { useState, useEffect } from "react";
import { Loader, useMantineColorScheme } from "@mantine/core";

const LoadingScreen = () => {
  const messages = ["Just a minute...", "Almost there...", "Loading your data...", "Hang tight..."];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
      setCurrentMessage(messages[(index + 1) % messages.length]);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, [index]);

  const { colorScheme } = useMantineColorScheme(); 
    const isDark = colorScheme === "dark";

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-1000 ${isDark
                  ? "bg-[#040611] text-gray-200"
                  : "bg-gray-200 text-black"
              }`}>
      <Loader type="bars" />
      <p className="mt-4 text-lg font-medium opacity-0 animate-fadeIn">{currentMessage}</p>
    </div>
  );
};

export default LoadingScreen;
