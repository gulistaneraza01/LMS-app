import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../contexts/AppProvider";
import { toast } from "react-toastify";
import axios from "axios";
import apiRoutes from "../../utils/apiRoutes";

function AddCourse() {
  const { getToken } = useAppContext();

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });
  const [popUp, setPopUp] = useState(false);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  function handleChapter(action, chapterId) {
    if (action === "add") {
      const title = prompt("Enter chapter name");
      if (title) {
        const newChapter = {
          chapterId: uuid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return { ...chapter, collapsed: !chapter.collapsed };
          } else {
            return chapter;
          }
        })
      );
    }
  }

  function addLecture() {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setPopUp(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail Not selected");
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        isPublished: true,
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("file", image);

      const token = await getToken();

      const { data } = await axios.post(apiRoutes.addCourse, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setCoursePrice(0);
        setChapters([]);
        setDiscount(0);
        setImage(null);
        setCourseTitle("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleLecture(action, chapterId, lectureIndex) {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setPopUp(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  }

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start  justify-between  p-4 md:p-8 pt-8 pb-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="coursetitle">Course Title</label>
          <input
            type="text"
            name="coursetitle"
            id="coursetitle"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            required
            placeholder="Type here"
            className="outline-none border border-gray-500 rounded px-3 py-2 md:py-2.5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="coursetitle">Course Description</label>
          <div ref={editorRef}></div>
        </div>

        <div className="flex justify-between items-end gap-3">
          <div className="flex flex-col gap-4 ">
            <p className="text-sm sm:text-base">Course Price</p>
            <input
              type="number"
              name="price"
              id="price"
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              placeholder="0"
              required
              className="border px-2 sm:px-4 py-1 sm:py-1.5 w-20 sm:w-28 rounded"
            />
          </div>

          <div className="flex justify-center gap-1.5 sm:gap-3 items-center ">
            <p className="text-sm sm:text-lg">Course Thumbnail</p>
            <label htmlFor="coursethumnail">
              <img
                src={assets.file_upload_icon}
                alt="file_upload_icon"
                className="p-1.5 sm:p-3 bg-blue-600 rounded"
              />
              <input
                type="file"
                name="coursethumnail"
                id="coursethumnail"
                accept="image/*"
                hidden
                required
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </label>
            {image && (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="uploadedimage"
                className="max-h-10"
              />
            )}
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="discount" className="text-sm sm:text-base mr-4 ">
            Discount %
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            min={0}
            max={100}
            required
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="border border-gray-500 rounded outline-none px-2 sm:px-4 py-1 sm:py-1.5 w-20 sm:w-28 "
          />
        </div>

        {/* adding chapter and lectures */}
        <div>
          {chapters.map((chapter, index) => {
            return (
              <div key={index} className="bg-white border rounded-lg mb-4">
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={assets.dropdown_icon}
                      width={14}
                      onClick={() => handleChapter("toggle", chapter.chapterId)}
                      alt="dropdown_icon"
                      className={`mr-2 cursor-pointer transition-all ${
                        chapter.collapsed && "-rotate-90"
                      } `}
                    />
                    <span>{chapter.chapterTitle}</span>
                  </div>
                  <span className="text-gray-500">
                    {chapter.chapterContent.length}
                  </span>
                  <img
                    src={assets.cross_icon}
                    alt="cross_icon"
                    className="cursor-pointer"
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                  />
                </div>
                {!chapter.collapsed && (
                  <div className="p-4">
                    {chapter.chapterContent.map((lecture, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-2"
                        >
                          <span>
                            {i + 1} {lecture.lectureTitle} -{" "}
                            {lecture.lectureDuration} mins -{" "}
                            <a href={lecture.lectureUrl} target="_blank">
                              Link
                            </a>{" "}
                            - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                          </span>
                          <img
                            onClick={() =>
                              handleLecture("remove", chapter.chapterId, i)
                            }
                            src={assets.cross_icon}
                            className="cursor-pointer"
                            alt="cross_icon"
                          />
                        </div>
                      );
                    })}
                    <div
                      onClick={() => {
                        handleLecture("add", chapter.chapterId);
                      }}
                      className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    >
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>
          {popUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-90">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    className="mt-1 block w-full border rounded py-1 px-2"
                    onChange={(e) => {
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="mb-2">
                  <p>Duration {"minutes"}</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) => {
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) => {
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex gap-2 my-4">
                  <p>is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="mt-1 scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => {
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      });
                    }}
                  />
                </div>
                <button
                  onClick={() => addLecture()}
                  type="button"
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded"
                >
                  Add
                </button>

                <img
                  src={assets.cross_icon}
                  alt="cross_icon"
                  onClick={() => setPopUp(false)}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
