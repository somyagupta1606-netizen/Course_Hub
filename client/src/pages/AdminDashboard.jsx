import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <div className="flex flex-col gap-4">
          <Link to="/admin/categories" className="hover:text-blue-400">
            Manage Categories
          </Link>

          <Link to="/admin/courses" className="hover:text-blue-400">
            Manage Courses
          </Link>

          <Link to="/admin/users" className="hover:text-blue-400">
            Manage Users
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;