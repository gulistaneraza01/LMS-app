import { useState } from "react";
import { useAppContext } from "../../contexts/AppProvider";
import { assets } from "../../assets/assets";
import EnrolledLectureContent from "./EnrolledLectureContent";

function EnrolledDropDownPlaylist({
  chapterTitle,
  chapterContent,
  setPlayerData,
  chapterOrder,
}) {
  const [isOpen, setisOpen] = useState(false);
  const { calChapterDuration } = useAppContext();

  const chapterDuration = calChapterDuration(chapterContent);

  function handleclick() {
    setisOpen((prev) => {
      return !prev;
    });
  }

  return (
    <div className="my-4 cursor-pointer ">
      <div
        onClick={handleclick}
        className="flex justify-between items-center border border-gray-300 bg-white px-3 py-3  rounded"
      >
        <div className="flex items-center gap-2">
          <img
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            src={assets.arrow_down}
            alt="down_arrow_icon"
          />
          <p className="text-gray-800 text-sm sm:text-base font-medium">
            {chapterTitle}
          </p>
        </div>
        <p className="text-sm sm:text-base">
          {chapterContent.length} lectures - {chapterDuration}
        </p>
      </div>
      <div
        className={`${
          isOpen &&
          "bg-white border-b border-x border-gray-300 pl-8 py-6 pr-2 cursor-default "
        }`}
      >
        {isOpen &&
          chapterContent.map((chapter) => {
            return (
              <EnrolledLectureContent
                {...chapter}
                key={chapter.lectureId}
                setPlayerData={setPlayerData}
                chapterOrder={chapterOrder}
              />
            );
          })}
      </div>
    </div>
  );
}

export default EnrolledDropDownPlaylist;
