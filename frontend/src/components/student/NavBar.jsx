import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../../contexts/AppProvider";
import { toast } from "react-toastify";
import axios from "axios";
import apiRoutes from "../../utils/apiRoutes";

function NavBar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { isEducator, getToken, setIsEducator } = useAppContext();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();

      const { data } = await axios(apiRoutes.becomeEducator, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex justify-between items-center py-3 sm:py-4 container gap-4">
      <h2>
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
        </Link>
      </h2>

      {/* laptop and desktop screen size */}
      <ul className="hidden md:flex items-center gap-5 text-gray-500">
        {user && (
          <>
            <li>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator dashboard" : "Become Educator"}
              </button>
            </li>

            <li>
              <NavLink to="myEnrollment">My Enrollment</NavLink>
            </li>
          </>
        )}
        <li>
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => {
                openSignIn();
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-full cursor-pointer "
            >
              Create Account
            </button>
          )}
        </li>
      </ul>

      {/* mobile screen size */}
      <ul className="md:hidden flex items-center  gap-2 text-gray-500 text-xs">
        {user && (
          <>
            <li>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator dashboard" : "Become Educator"}
              </button>
            </li>

            <li>
              <NavLink to="myEnrollment">My Enrollment</NavLink>
            </li>
          </>
        )}

        <li>
          {user ? (
            <UserButton />
          ) : (
            <img
              src={assets.user_icon}
              alt="user icon"
              onClick={() => {
                openSignIn();
              }}
            />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
