import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import Hero from "../../components/student/Hero";
import Testimonials from "../../components/student/Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-cyan-100/70">
        <Hero />
      </div>
      <div className="container">
        <Companies />
        <CourseSection />
        <Testimonials />
        <CallToAction />
      </div>
      <div className="bg-gray-900">
        <Footer />
      </div>
    </>
  );
}

export default Home;
