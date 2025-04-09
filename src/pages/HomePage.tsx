import { useMantineColorScheme } from "@mantine/core";
import Companies from "../components/landing-page/Companies";
import Hero from "../components/landing-page/Hero";
import Category from "../components/landing-page/Category";
import WorkFlow from "../components/landing-page/WorkFlow";
import Testimonials from "../components/landing-page/Testimonials";
import NewsLetter from "../components/landing-page/NewsLetter";

const HomePage = () => {
  const { colorScheme } = useMantineColorScheme(); // Get current theme
  const isDark = colorScheme === "dark";

  return (
    <div
      className={`min-h-[100vh] ${
        isDark
          ? "bg-[#040611] text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      <Hero />
      <Companies />
      <Category />
      <WorkFlow />
      <Testimonials />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
