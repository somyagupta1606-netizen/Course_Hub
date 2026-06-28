import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-blue-400">
          CourseHub
        </NavLink>

        <div className="flex items-center gap-5">
          <NavLink to="/" className="hover:text-blue-400">
            Home
          </NavLink>

          {/* Student */}
          {token && role === "student" && (
            <>
              <NavLink to="/cart" className="hover:text-blue-400">
                Cart
              </NavLink>

              <NavLink to="/my-courses" className="hover:text-blue-400">
                My Courses
              </NavLink>

              <NavLink to="/profile" className="hover:text-blue-400">
                Profile
              </NavLink>
            </>
          )}

          {/* Instructor */}
          {token && role === "instructor" && (
            <>
              <NavLink to="/instructor" className="hover:text-blue-400">
                Dashboard
              </NavLink>

              <NavLink to="/profile" className="hover:text-blue-400">
                Profile
              </NavLink>
            </>
          )}

          {/* Admin */}
          {token && role === "admin" && (
            <>
              <NavLink to="/admin" className="hover:text-blue-400">
                Dashboard
              </NavLink>

              <NavLink to="/profile" className="hover:text-blue-400">
                Profile
              </NavLink>
            </>
          )}

          {/* Guest */}
          {!token && (
            <>
              <NavLink to="/login" className="hover:text-blue-400">
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Register
              </NavLink>
            </>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
