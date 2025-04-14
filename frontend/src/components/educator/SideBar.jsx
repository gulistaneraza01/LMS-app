import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../contexts/AppProvider";

function SideBar() {
  const { isEducator } = useAppContext();

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/educator",
      icon: assets.home_icon,
    },
    {
      id: 2,
      name: "Add Course",
      path: "/educator/addCourse",
      icon: assets.add_icon,
    },
    {
      id: 3,
      name: "My Courses",
      path: "/educator/myCourse",
      icon: assets.my_course_icon,
    },
    {
      id: 4,
      name: "Student Enrolled ",
      path: "/educator/studentEnrolled",
      icon: assets.person_tick_icon,
    },
  ];

  if (!isEducator) {
    return <h2>Educator login is required</h2>;
  }

  return (
    <div className="w-12 md:w-50 min-h-screen flex flex-col border-r border-gray-500 py-2 ">
      {menuItems.map((menuItem) => {
        return (
          <NavLink
            key={menuItem.id}
            to={menuItem.path}
            end
            className={({ isActive }) =>
              `flex gap-2 items-center flex-col justify-center md:flex-row md:justify-start py-3 md:px-5
            ${
              isActive
                ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                : "border-r-[6px] border-white hover:border-gray-100/90 hover:bg-gray-100/90"
            }`
            }
          >
            <img src={menuItem.icon} alt="sidebar icon" className="w-6 h-6" />
            <p className="hidden md:block text-center">{menuItem.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
