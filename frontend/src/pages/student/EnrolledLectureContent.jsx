import humanizeDuration from "humanize-duration";
import { assets } from "../../assets/assets";

function EnrolledLectureContent({
  lectureTitle,
  lectureDuration,
  lectureUrl,
  setPlayerData,
  chapterOrder,
  lectureOrder,
}) {
  const chaptertime = humanizeDuration(lectureDuration * 60 * 1000, {
    units: ["h", "m"],
  });
  return (
    <div className=" flex justify-between items-center mb-2  gap-4">
      <div className="flex gap-2 text-xs sm:text-base">
        <img src={assets.play_icon} alt="lectureTitle" />
        <p>{lectureTitle}</p>
      </div>
      <div className="flex gap-2 text-xs sm:text-base">
        <p
          className="text-blue-400 cursor-pointer"
          onClick={() =>
            setPlayerData({
              videoId: lectureUrl.split("/").pop(),
              lectureOrder,
              chapterOrder,
              lectureTitle,
            })
          }
        >
          watch
        </p>
        <p>{chaptertime}</p>
      </div>
    </div>
  );
}

export default EnrolledLectureContent;
