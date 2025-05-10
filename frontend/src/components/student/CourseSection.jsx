import { Link } from "react-router-dom";

import { useAppContext } from "../../contexts/AppProvider";
import CourseCard from "./CourseCard";

function CourseSection() {
  const { allCourses } = useAppContext();
  console.log("b", { allCourses });

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl text-gray-800 font-semibold">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 m-4">
        Discover our top-rated courses across various categories. From coding
        and design to <br className="max-sm:hidden" /> business and wellness,
        our courses are crafted to deliver results.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 my-10 sm:my-16">
        {allCourses.slice(0, 4).map((course) => {
          return <CourseCard key={course._id} {...course} />;
        })}
      </div>

      <Link
        to="course"
        onChange={() => scrollTo(0, 0)}
        className="border border-gray-500/30 px-4 py-1.5 sm:px-6 sm:py-2  text-gray-500 rounded"
      >
        Show all courses
      </Link>
    </div>
  );
}

export default CourseSection;
