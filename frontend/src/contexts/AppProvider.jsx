import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const AppContext = createContext();

function AppProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserToken();
    }
  }, [user]);

  async function getUserToken() {
    console.log(user);
    console.log(await getToken());
  }

  useEffect(() => {
    fetchAppdata();
  }, []);

  const fetchAppdata = async () => {
    setAllCourses(dummyCourses);
    setEnrolledCourses(dummyCourses);
  };

  const calAvgRating = (courseRatings) => {
    if (courseRatings.length) {
      const avgrating = courseRatings.reduce((acc, cur) => acc + cur.rating, 0);
      courseRatings.length;
      return avgrating;
    }
    return 0;
  };

  const calChapterDuration = (chapter) => {
    const time = chapter.reduce((acc, cur) => {
      return acc + cur.lectureDuration;
    }, 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calTotalCourseDuration = (courseContent) => {
    const totalDuration = courseContent.reduce((acc, chapter) => {
      return (
        acc +
        chapter.chapterContent.reduce(
          (sum, lecture) => sum + lecture.lectureDuration,
          0
        )
      );
    }, 0);
    return humanizeDuration(totalDuration * 60 * 1000, { units: ["h", "m"] });
  };

  const calNoOfchapter = (course) => {
    let total = 0;
    course.courseContent.forEach((chapter) => {
      if (chapter.chapterId) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  return (
    <AppContext.Provider
      value={{
        allCourses,
        calAvgRating,
        isEducator,
        calTotalCourseDuration,
        calChapterDuration,
        calNoOfchapter,
        enrolledCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppProvider;
