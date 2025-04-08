import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppProvider";
import { Line } from "rc-progress";

function StudentEnrolledData({
  _id,
  courseTitle,
  courseThumbnail,
  courseContent,
  lectureCompleted,
  totalLectures,
}) {
  const { calTotalCourseDuration } = useAppContext();
  const navigate = useNavigate();

  const progressPer = Math.floor((lectureCompleted / totalLectures) * 100);

  return (
    <div className="grid grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center border border-gray-500/20 p-5">
      <div className="flex gap-2 items-center ">
        <img
          src={courseThumbnail}
          alt="couse thumbnail"
          className="w-10 sm:w-24"
        />
        <div>
          <p className="text-xs sm:text-sm md:text-base">{courseTitle}</p>
          <Line
            percent={progressPer}
            strokeWidth={2}
            className="w-full mt-1 bg-gray-300 rounded"
          />
        </div>
      </div>
      <p className="max-sm:hidden text-xs sm:text-sm md:text-base">
        {calTotalCourseDuration(courseContent)}
      </p>
      <p className="max-sm:hidden text-xs sm:text-sm md:text-base">
        {lectureCompleted}/{totalLectures} Lectures
      </p>

      <div>
        <button
          onClick={() => {
            navigate(`/player/${_id}`);
          }}
          className={`${
            lectureCompleted === totalLectures ? "bg-green-500" : "bg-blue-500"
          } text-left px-3 py-1.5 sm:px-6 sm:py-2 rounded  text-white text-xs sm:text-sm md:text-base`}
        >
          {lectureCompleted === totalLectures ? "Completed" : "OnGoing"}
        </button>
      </div>
    </div>
  );
}

export default StudentEnrolledData;
