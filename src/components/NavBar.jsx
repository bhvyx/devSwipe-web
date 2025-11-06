import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar w-full bg-[#0b0f13]/95 backdrop-blur-md border-b border-gray-800 text-gray-300 px-6 py-3 shadow-[0_2px_20px_rgba(79,70,229,0.1)] sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold bg-linear-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent hover:opacity-90 transition-all"
        >
          💡 DevSwipe
        </Link>
      </div>

      <div className="flex-none gap-3">
        {user && (
          <div className="dropdown dropdown-end flex items-center relative">
            <p className="px-3 text-sm text-gray-300">
              Welcome,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-500 font-medium">
                {user.firstName}
              </span>
            </p>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-gray-700 hover:border-indigo-500 transition-all"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="user avatar" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#11161d]/95 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl mt-[4.3rem] w-52 p-2 text-gray-300"
            >
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-linear-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:text-white rounded-md transition-all"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-linear-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:text-white rounded-md transition-all"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-linear-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:text-white rounded-md transition-all"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-linear-to-r hover:from-pink-600 hover:to-rose-600 hover:text-white rounded-md transition-all"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
