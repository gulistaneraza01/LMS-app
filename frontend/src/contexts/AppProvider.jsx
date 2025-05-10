import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import apiRoutes from "../utils/apiRoutes";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/constaints";

const AppContext = createContext();

function AppProvider({ children }) {
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [userData, setUserData] = useState(null);

  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUser();
      fetchenrolledStudent();
    }
  }, [user]);

  //fetch userData
  const fetchUser = async () => {
    if (user.publicMetadata.role === "admin") {
      setIsEducator(true);
    }

    try {
      const token = await getToken();

      const { data } = await axios(apiRoutes.userDataURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // async function getUserToken() {
  //   console.log(user);
  //   console.log(await getToken());
  // }

  useEffect(() => {
    fetchAllCourse();
  }, []);

  //fetch allcourses
  const fetchAllCourse = async () => {
    try {
      const { data } = await axios(apiRoutes.allCourseURL);

      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch enrolledStudent
  const fetchenrolledStudent = async () => {
    try {
      const token = await getToken();

      const { data } = await axios(apiRoutes.enrolledCourses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
        setIsEducator,
        calTotalCourseDuration,
        calChapterDuration,
        calNoOfchapter,
        enrolledCourses,
        userData,
        getToken,
        fetchAllCourse,
        fetchenrolledStudent,
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
