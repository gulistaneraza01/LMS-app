import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/student/NavBar";

function RootLayout() {
  const location = useLocation();
  const isCoursePage = location.pathname === "/course";

  return (
    <>
      <header
        className={` ${
          isCoursePage ? "bg-white" : "bg-cyan-100/70"
        } border-b border-gray-800`}
      >
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
