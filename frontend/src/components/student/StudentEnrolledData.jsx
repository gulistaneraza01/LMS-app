import { useState } from "react";
import { useAppContext } from "../../contexts/AppProvider";

function StudentEnrolledData({
  courseTitle,
  courseThumbnail,
  courseContent,
  progressObject,
}) {
  const { calTotalCourseDuration } = useAppContext();

  return (
    <div className="grid grid-cols-[2fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center border border-gray-500/20 p-5">
      <div className="flex gap-2 items-center ">
        <img
          src={courseThumbnail}
          alt="couse thumbnail"
          className="w-10 sm:w-24"
        />
        <p className="text-xs sm:text-sm md:text-base">{courseTitle}</p>
      </div>
      <p className="max-sm:hidden text-xs sm:text-sm md:text-base">
        {calTotalCourseDuration(courseContent)}
      </p>
      <p className="max-sm:hidden text-xs sm:text-sm md:text-base">
        {progressObject.lectureCompleted}/{progressObject.totalLectures}{" "}
        Lectures
      </p>

      {/* <div className="">
        {progressObject.lectureCompleted === progressObject.totalLectures
            ? 
            <button className="text-left px-3 py-1.5 sm:px-6 sm:py-2 rounded bg-blue-500 text-white text-xs sm:text-sm md:text-base">completed</button>
            :<button> on Going </button>}
        
      </div> */}
    </div>
  );
}

export default StudentEnrolledData;
