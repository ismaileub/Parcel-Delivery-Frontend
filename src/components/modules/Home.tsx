import Banner from "./Banner";
import OurServices from "./Services";
import AboutUs from "./AboutUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FaqSection from "./FaqSection";

const Home = () => {
  return (
    <div className="mt-10">
      <Banner />
      <OurServices />
      <HowItWorks />
      <AboutUs />
      <Testimonials />
      <FaqSection />
    </div>
  );
};

export default Home;
