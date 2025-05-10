import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import { format } from "date-fns";
import apiRoutes from "../../utils/apiRoutes";
import { useAppContext } from "../../contexts/AppProvider";
import { toast } from "react-toastify";
import axios from "axios";

function StudentEnrolled() {
  const { isEducator, getToken } = useAppContext();

  const [studentEnrolled, setStudentEnrolled] = useState(null);

  useEffect(() => {
    if (isEducator) {
      fetchStudentEnrolled();
    }
  }, [isEducator]);

  const fetchStudentEnrolled = async () => {
    try {
      const token = await getToken();

      const { data } = await axios(apiRoutes.enrolledStudentURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      if (data.success) {
        setStudentEnrolled(data.enrolledStudents);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="sm:max-w-[90%]">
      <div className="grid grid-cols-[0.2fr_2fr_1fr_1fr] border items-center p-1 sm:p-2 text-sm sm:text-base border-gray-200 rounded-t text-gray-800">
        <p>#</p>
        <p>Student name</p>
        <p>Course Title</p>
        <p>Date</p>
      </div>

      <div>
        {studentEnrolled &&
          studentEnrolled.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[0.2fr_2fr_1fr_1fr] items-center border border-gray-200 p-1 sm:p-2  text-gray-500 text-xs sm:text-sm rounded-b"
              >
                <p>{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.student.imageUrl}
                    alt="studentimage"
                    className="w-4 h-4 sm:w-9 sm:h-9 rounded-full"
                  />
                  <p>{item.student.name}</p>
                </div>
                <p>{item.courseTitle}</p>
                <p>{format(item.purchaseDate, "dd MMM, yyyy")}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StudentEnrolled;
