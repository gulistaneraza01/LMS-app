import { UserButton, useUser } from "@clerk/clerk-react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <nav className="flex justify-between items-center py-3 sm:py-4 gap-4 px-8">
      <h2>
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
        </Link>
      </h2>

      <ul className="hidden md:flex items-center gap-5 text-gray-500">
        <li>Hi, {user ? user.fullName : "developer"} </li>
        <li>
          {user ? (
            <UserButton />
          ) : (
            <img
              src={assets.profile_img}
              alt="profile_img"
              className="max-w-8"
            />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
