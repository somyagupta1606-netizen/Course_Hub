import { Link, Outlet } from "react-router-dom";

function InstructorDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">Instructor Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-5 h-fit">
          <ul className="space-y-4">
            <li>
              <Link
                to="add-course"
                className="block bg-blue-500 text-white p-3 rounded text-center"
              >
                Add Course
              </Link>
            </li>

            <li>
              <Link
                to="my-courses"
                className="block bg-green-500 text-white p-3 rounded text-center"
              >
                My Courses
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;