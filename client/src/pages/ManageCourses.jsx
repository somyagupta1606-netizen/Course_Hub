import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function ManageCourses() {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await api.get("/courses/all");
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      let confirmDelete = window.confirm(
        "Are you sure you want to delete this course?",
      );

      if (!confirmDelete) return;

      await api.delete(`/courses/delete/${id}`);

      toast.success("Course Deleted Successfully");

      getCourses();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="border p-3">S.No</th>
              <th className="border p-3">Thumbnail</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Instructor</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Duration</th>
              <th className="border p-3">Level</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={course._id}>
                  <td className="border p-3 text-center">{index + 1}</td>

                  <td className="border p-3 text-center">
                    <img
                      src={
                        course.thumbnail ||
                        "https://placehold.co/100x70?text=Course"
                      }
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded mx-auto"
                    />
                  </td>

                  <td className="border p-3">{course.title}</td>

                  <td className="border p-3 text-center">
                    {course.category?.categoryName}
                  </td>

                  <td className="border p-3 text-center">
                    {course.instructorId?.name}
                  </td>

                  <td className="border p-3 text-center">₹ {course.price}</td>

                  <td className="border p-3 text-center">{course.duration}</td>

                  <td className="border p-3 text-center capitalize">
                    {course.level}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-6">
                  No Courses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCourses;
