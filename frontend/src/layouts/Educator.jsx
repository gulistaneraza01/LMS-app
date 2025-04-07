import { Outlet } from "react-router-dom";
import NavBar from "../components/educator/NavBar";

function Educator() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Educator;
