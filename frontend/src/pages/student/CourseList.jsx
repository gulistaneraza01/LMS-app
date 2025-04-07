import { useNavigate, useSearchParams } from "react-router-dom";
import CourseHeader from "../../components/student/CourseHeader";
import Footer from "./Footer";
import CourseCard from "../../components/student/CourseCard";
import { useAppContext } from "../../contexts/AppProvider";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

function CourseList() {
  const { allCourses } = useAppContext();
  const [filterCourses, setFilterCourses] = useState([]);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchterm");
  const navigate = useNavigate();

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      searchTerm
        ? setFilterCourses(
            tempCourses.filter((course) => {
              return course.courseTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          )
        : setFilterCourses(tempCourses);
    }
  }, [allCourses, searchTerm]);

  return (
    <>
      <div className="container">
        <CourseHeader searchTerm={searchTerm} />

        {searchTerm && (
          <div className="inline-flex gap-4 items-center mt-10 text-gray-600 border px-4 py-1.5 border-gray-200 rounded-sm">
            <p>{searchTerm}</p>
            <img
              src={assets.cross_icon}
              alt="cross icon"
              className=""
              onClick={() => navigate("/course")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 sm:my-16">
          {filterCourses.map((course) => {
            return <CourseCard {...course} key={course._id} />;
          })}
        </div>
      </div>
      <div className="bg-gray-900">
        <Footer />
      </div>
    </>
  );
}

export default CourseList;
