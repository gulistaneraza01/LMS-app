import { Outlet } from "react-router-dom";
import NavBar from "../components/educator/NavBar";
import Footer from "../components/educator/Footer";
import SideBar from "../components/educator/SideBar";

function Educator() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <hr />
      <main className="flex">
        <SideBar />
        <div className="flex-1 p-3 sm:p-7">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Educator;
