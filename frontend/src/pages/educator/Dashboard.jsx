import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import { currency } from "../../utils/constaints";
import StudentEnrolled from "./StudentEnrolled";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setDashboardData(dummyDashboardData);
  }, []);

  // if (isLoading) {
  //   return <h1>loading</h1>;
  // }

  return (
    <div>
      <div className="flex justify-start gap-6 flex-wrap ">
        <div className="w-57 border border-blue-400 rounded flex items-center sm:p-5 p-3 gap-2">
          <img
            src={assets.patients_icon}
            alt="patients_icon"
            className="max-w-14 max-h-14"
          />
          <div>
            <p className="text-base sm:text-xl text-gray-600">
              {dashboardData && dashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-gray-500 text-xs sm:text-base">
              Total Enrolments
            </p>
          </div>
        </div>
        <div className="w-57 border border-blue-400 rounded flex items-center sm:p-5 p-3 gap-2">
          <img
            src={assets.appointments_icon}
            alt="appointments_icon"
            className="max-w-14 max-h-14"
          />
          <div>
            <p className="text-base sm:text-xl text-gray-600">
              {dashboardData && dashboardData.totalCourses}
            </p>
            <p className="text-gray-500 text-xs sm:text-base">Total Courses</p>
          </div>
        </div>
        <div className="w-57 border border-blue-400 rounded flex items-center sm:p-5 p-3 gap-2">
          <img
            src={assets.earning_icon}
            alt="earning_icon"
            className="max-w-14 max-h-14"
          />
          <div>
            <p className="text-base sm:text-xl text-gray-600">
              {currency} {dashboardData && dashboardData.totalEarnings}
            </p>
            <p className="text-gray-500 text-xs sm:text-base">Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="sm:max-w-[70%]">
        <h3 className="mt-5 mb-2 sm:mt-9 sm:mb-5 text-gray-800 text-sm sm:text-lg">
          Latest Enrolments
        </h3>
        <div className="grid grid-cols-[0.2fr_2fr_1fr] border items-center p-1 sm:p-2 text-sm sm:text-base border-gray-200 rounded-t text-gray-800">
          <p>#</p>
          <p>Student name</p>
          <p>Course Title</p>
        </div>
        <div>
          {dashboardData &&
            dashboardData.enrolledStudentsData.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-[0.2fr_2fr_1fr] items-center border border-gray-200 p-1 sm:p-2  text-gray-500 text-xs sm:text-sm rounded-b"
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
                  {/* <p>{format(item.purchaseDate, "dd MMM, yyyy")}</p> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
