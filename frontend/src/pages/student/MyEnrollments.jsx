import { useState } from "react";
import StudentEnrolledData from "../../components/student/StudentEnrolledData";
import { useAppContext } from "../../contexts/AppProvider";

function MyEnrollments() {
  const { enrolledCourses } = useAppContext();
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 2 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 0, totalLectures: 9 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 2, totalLectures: 2 },
    { lectureCompleted: 1, totalLectures: 8 },
    { lectureCompleted: 5, totalLectures: 6 },
  ]);

  return (
    <div className="container">
      <div>
        <h1 className="py-10 text-2xl font-medium">My Enrollments</h1>
        <div className="grid grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] items-center border border-gray-500/20 p-4">
          <p>Course</p>
          <p className="max-sm:hidden">Duration</p>
          <p className="max-sm:hidden">Completed</p>
          <p>Status</p>
        </div>
        <div className="">
          {enrolledCourses &&
            enrolledCourses.map((item, index) => {
              return (
                <StudentEnrolledData
                  {...item}
                  key={item._id}
                  progressObject={progressArray[index]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MyEnrollments;
