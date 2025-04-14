import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppProvider";
import { currency } from "../../utils/constaints";
import { format } from "date-fns";

function MyCourse() {
  const { allCourses } = useAppContext();

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    setCourses(allCourses);
  }, [courses]);

  // if (isLoading) {
  //   return <h1>loading....</h1>;
  // }

  return (
    <div className="w-full sm:max-w-[90%]">
      <h2 className="text-base sm:text-lg text-gray-800">My Courses</h2>
      <div className="mt-5 grid grid-cols-[2fr_1fr_1fr_1fr] border items-center p-1 sm:p-2 text-xs sm:text-base border-gray-200 rounded-t text-gray-800">
        <p>All Courses</p>
        <p>Earnings</p>
        <p>Students</p>
        <p>Course Status</p>
      </div>

      <div>
        {courses &&
          courses.map((course) => {
            return (
              <div
                key={course._id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border border-gray-200 p-1 sm:p-2  text-gray-500 text-xs sm:text-sm rounded-b"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={course.courseThumbnail}
                    alt="studentimage"
                    className="w-4 sm:w-16 sm:rounded-sm "
                  />
                  <p>{course.courseTitle}</p>
                </div>
                <p>
                  {currency}
                  {(
                    course.coursePrice -
                    (course.coursePrice * course.discount) / 100
                  ).toFixed(2)}
                </p>
                <p>{course.enrolledStudents.length}</p>
                <p>{format(course.createdAt, "dd MMM, yyyy")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyCourse;
