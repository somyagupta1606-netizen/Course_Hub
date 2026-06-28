import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function InstructorCourses() {
  const [courses, setCourses] = useState([]);

  const getInstructorCourses = async () => {
    try {
      let response = await api.get("/courses/instructor-courses");

      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);

      if (error.response.status !== 404) {
        toast.error(error.response.data.msg || "Something Went Wrong");
      }
    }
  };

  const deleteCourse = async (id) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    try {
      let response = await api.delete(`/courses/delete/${id}`);

      toast.success(response.data.msg);

      getInstructorCourses();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Delete Failed");
    }
  };

  useEffect(() => {
    getInstructorCourses();
  }, []);

  if (courses.length === 0) {
    return (
      <h2 className="text-center text-2xl font-semibold">
        No Courses Added Yet
      </h2>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={
                course.thumbnail || "https://placehold.co/600x350?text=Course"
              }
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{course.title}</h2>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {course.description}
              </p>

              <p className="mt-3 font-semibold">₹ {course.price}</p>

              <p className="text-sm text-blue-600 mt-2">
                {course.category?.categoryName}
              </p>

              <div className="flex gap-3 mt-5">
                <Link
                  to={`/edit-course/${course._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </Link>

                <button
                  onClick={() => deleteCourse(course._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorCourses;