import { useEffect, useState } from "react";
import StudentEnrolledData from "../../components/student/StudentEnrolledData";
import { useAppContext } from "../../contexts/AppProvider";
import Footer from "./Footer";
import { toast } from "react-toastify";
import apiRoutes from "../../utils/apiRoutes";
import axios from "axios";

function MyEnrollments() {
  const {
    enrolledCourses,
    userData,
    fetchenrolledStudent,
    getToken,
    calNoOfchapter,
  } = useAppContext();
  const [progressArray, setProgressArray] = useState([]);

  const fetchProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            apiRoutes.courseProgress,
            {
              courseId: course._id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          let totalLectures = calNoOfchapter(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchenrolledStudent();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      fetchProgress();
    }
  }, [enrolledCourses]);

  return (
    <>
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
                    {...progressArray[index]}
                    {...name}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 mt-16 sm:mt-20">
        <Footer />
      </div>
    </>
  );
}

export default MyEnrollments;
