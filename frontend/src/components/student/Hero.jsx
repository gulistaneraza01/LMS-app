import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <div className="container flex flex-col justify-center items-center gap-12 text-center pt-18 md:pt-36">
      <h2 className="relative font-bold text-gray-800 max-w-3xl m-auto text-2xl sm:text-4xl md:text-5xl">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600">fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch line"
          className="hidden md:block absolute right-0 -bottom-7"
        />
      </h2>
      <p className=" text-gray-500">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <SearchBar />
    </div>
  );
}

export default Hero;
