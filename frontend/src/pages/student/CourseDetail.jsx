import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppProvider";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import DropdownPlaylist from "../../components/student/DropdownPlaylist";
import { baseUrl, currency } from "../../utils/constaints";
import Footer from "./Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";
import apiRoutes from "../../utils/apiRoutes";

function CourseDetail() {
  const [courseData, setCourseData] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const { id } = useParams();
  const {
    allCourses,
    calAvgRating,
    calTotalCourseDuration,
    calNoOfchapter,
    userData,
    getToken,
  } = useAppContext();

  const navigate = useNavigate();

  async function fetchCourse() {
    try {
      const { data } = await axios(`${apiRoutes.allCourseURL}/${id}`);

      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const enrolledCourse = async () => {
    console.log("called");
    try {
      if (!userData) {
        return toast.warn("Login To Enroll");
      }

      if (isEnrolled) {
        return toast.warn("Already Enroll To Course");
      }

      const token = await getToken();

      const { data } = await axios.post(
        apiRoutes.purchaseCourseUrl,
        {
          courseId: courseData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", data);
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  console.log(playerData);
  return (
    <div className="bg-gradient-to-b from-cyan-100/70">
      <div className="container">
        {courseData && (
          <div className="flex flex-col-reverse md:flex-row  gap-10 items-start justify-between text-left py-15 sm:py-20 ">
            <div className="max-w-xl text-gray-500">
              <h1 className="text-2xl sm:text-4xl text-gray-800 font-semibold mb-4">
                {courseData.courseTitle}
              </h1>
              <p
                className="text-sm md:text-base my-5"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription.slice(0, 200),
                }}
              ></p>

              <div className="flex items-center gap-2 text-sm">
                <p>{Math.floor(calAvgRating(courseData.courseRatings))}</p>
                <div className="flex">
                  {[...Array(5)].map((item, index) => {
                    return (
                      <img
                        src={
                          index <
                          Math.floor(calAvgRating(courseData.courseRatings))
                            ? assets.star
                            : assets.star_blank
                        }
                        alt="star"
                        key={index}
                        className="w-4 h-4"
                      />
                    );
                  })}
                </div>
                <p className="text-blue-600">
                  ({courseData.courseRatings.length}{" "}
                  {courseData.courseRatings.length > 1 ? "ratings" : "rating"} )
                </p>
                <p>
                  {courseData.enrolledStudents.length}{" "}
                  {courseData.enrolledStudents.length > 1
                    ? "students"
                    : "student"}
                </p>
              </div>
              <p className="text-sm mt-1.5">
                Course by{" "}
                <span className="text-blue-600 underline">
                  {courseData.educator?.name}
                </span>
              </p>

              <div className="pt-8 text-gray-800 mb-20">
                <p className="text-xl font-semibold">Course Structure</p>
                <div className="mt-5">
                  {courseData &&
                    courseData.courseContent.map((chapter) => {
                      return (
                        <DropdownPlaylist
                          {...chapter}
                          key={chapter.chapterId}
                          setPlayerData={setPlayerData}
                        />
                      );
                    })}
                </div>
              </div>

              <h3 className="text-xl text-gray-900 font-semibold">
                Course Description
              </h3>

              <p
                className="course-detail"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription,
                }}
              ></p>
            </div>

            {/* left */}
            <div className="shadow-2xl max-w-[424px] bg-white">
              {playerData ? (
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 1 } }}
                  iframeClassName="w-full aspect-video"
                />
              ) : (
                <img src={courseData.courseThumbnail} alt="courseThumbnail" />
              )}
              <div className="p-5 ">
                <div className="flex items-center gap-2 text-red-500 font-medium">
                  <img src={assets.time_left_clock_icon} alt="" />
                  <p>5 days left at this price!</p>
                </div>
                <p className="my-3 flex items-center gap-3">
                  <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                    {currency}
                    {(
                      courseData.coursePrice -
                      (courseData.coursePrice * courseData.discount) / 100
                    ).toFixed(2)}
                  </span>
                  <span className="line-through text-gray-500 text-lg sm:text-xl mx-1">
                    {currency}
                    {courseData.coursePrice}
                  </span>
                  <span className=" text-gray-500 text-base sm:text-lg">
                    {courseData.discount}% off
                  </span>
                </p>

                <div className="flex items-center gap-2 sm:gap-4 text-gray-500">
                  <div className="flex items-center gap-1 text-sm sm:text-base">
                    <img src={assets.star} alt="star" />
                    <p>{Math.floor(calAvgRating(courseData.courseRatings))}</p>
                  </div>
                  |
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <img src={assets.time_clock_icon} alt="star" />
                    <p>{calTotalCourseDuration(courseData.courseContent)}</p>
                  </div>
                  |
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <img src={assets.lesson_icon} alt="star" />
                    <p>{calNoOfchapter(courseData)}lessons</p>
                  </div>
                </div>

                <button
                  onClick={enrolledCourse}
                  className="bg-blue-600 w-full my-6 rounded text-white py-3"
                >
                  {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </button>

                <p className="text-lg sm:text-xl font-medium">
                  What's in the course?
                </p>
                <ul className="list-disc text-gray-500 ml-5 mt-3 text-sm sm:text-base">
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900">
        <Footer />
      </div>
    </div>
  );
}

export default CourseDetail;
