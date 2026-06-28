import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const getCourse = async () => {
    try {
      let response = await api.get(`/courses/get-course/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed To Fetch Course");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      let response = await api.post("/cart/add", {
        courseId: course._id,
      });

      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed To Add Course");
    }
  };

  const deleteCourse = async () => {
    try {
      let confirmDelete = window.confirm(
        "Are you sure you want to delete this course?",
      );

      if (!confirmDelete) return;

      let response = await api.delete(`/courses/delete/${course._id}`);

      toast.success(response.data.msg);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed To Delete Course");
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  }

  if (!course) {
    return <h1 className="text-center mt-10 text-2xl">Course Not Found</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={
            course.thumbnail ||
            "https://placehold.co/1200x500?text=Course+Image"
          }
          alt={course.title}
          className="w-full h-100 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

          <p className="text-gray-700 mb-6">{course.description}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Price:</strong> ₹{course.price}
            </p>

            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <p>
              <strong>Level:</strong>{" "}
              <span className="capitalize">{course.level}</span>
            </p>

            <p>
              <strong>Category:</strong> {course.category?.categoryName}
            </p>

            <p>
              <strong>Instructor:</strong> {course.instructorId?.name}
            </p>

            <p>
              <strong>Email:</strong> {course.instructorId?.email}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            {/* Student */}
            {role === "student" && (
              <button
                onClick={addToCart}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Add To Cart
              </button>
            )}

            {/* Instructor */}
            {role === "instructor" && course.instructorId?._id === userId && (
              <>
                <Link
                  to={`/edit-course/${course._id}`}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
                >
                  Update Course
                </Link>

                <button
                  onClick={deleteCourse}
                  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Delete Course
                </button>
              </>
            )}

            {/* Admin */}
            {role === "admin" && (
              <>
                <Link
                  to={`/edit-course/${course._id}`}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                >
                  Edit Course
                </Link>

                <button
                  onClick={deleteCourse}
                  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Delete Course
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;