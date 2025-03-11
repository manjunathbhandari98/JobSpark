import Companies from "../components/landing-page/Companies";
import Hero from "../components/landing-page/Hero";
import Category from "../components/landing-page/Category";
import WorkFlow from "../components/landing-page/WorkFlow";
import Testimonials from "../components/landing-page/Testimonials";
import NewsLetter from "../components/landing-page/NewsLetter";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] text-white bg-[#040611]">
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
