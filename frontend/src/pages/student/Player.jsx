import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppProvider";
import EnrolledDropDownPlaylist from "./EnrolledDropDownPlaylist";
import YouTube from "react-youtube";
import Footer from "./Footer";
import { Rating } from "react-simple-star-rating";

function Player({ initialRating }) {
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [rating, setRating] = useState(initialRating || 0);

  const { courseId } = useParams();
  const { enrolledCourses } = useAppContext();

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  function getCourseData() {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        return setCourseData(course);
      }
    });
  }

  function handleRating(rate) {
    console.log(rate);
    setRating(rate);
  }

  return (
    <div>
      <div className="container">
        <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-10 md:items-center">
          {/* left */}
          <div className="pt-8 text-gray-800 mb-20">
            <p className="text-xl font-semibold">Course Structure</p>
            <div className="mt-5">
              {courseData &&
                courseData.courseContent.map((chapter) => {
                  return (
                    <EnrolledDropDownPlaylist
                      {...chapter}
                      key={chapter.chapterId}
                      setPlayerData={setPlayerData}
                    />
                  );
                })}
            </div>

            <div className="font-medium text-lg mt-20 flex  items-center gap-4">
              <h2>Rate this Course:</h2>
              <div className="flex flex-row items-center space-x-2">
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                  size={20}
                  SVGstyle={{ display: "inline-block", margin: "0 4px" }}
                  allowHover
                  transition
                />
              </div>
            </div>
          </div>

          {/* right */}

          <div className=" bg-white">
            {playerData ? (
              <>
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 1 } }}
                  iframeClassName="w-full aspect-video"
                />
                <div className="flex justify-between items-center p-4">
                  <p>
                    {playerData.chapterOrder}.{playerData.lectureOrder}
                    <span className="mx-1"></span>
                    {playerData.lectureTitle}
                  </p>
                  <button className="text-blue-500 cursor-pointer">
                    {false ? "Completed" : "Mark Completed"}
                  </button>
                </div>
              </>
            ) : (
              <img
                src={courseData && courseData.courseThumbnail}
                alt="courseThumbnail"
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-900 ">
        <Footer />
      </div>
    </div>
  );
}

export default Player;
