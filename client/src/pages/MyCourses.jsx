import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyCourses = async () => {
    try {
      let response = await api.get("/enrollments/my-courses");
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
      if (error.response.status !== 404) {
        toast.error(error.response.data.msg || "Failed To Fetch Courses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>

      {courses.length === 0 ? (
        <h2>No Courses Found</h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  item.courseId.thumbnail ||
                  "https://placehold.co/400x250?text=Course+Image"
                }
                alt={item.courseId.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {item.courseId.title}
                </h2>

                <p className="mb-2">₹{item.courseId.price}</p>

                <p className="mb-2 capitalize">{item.courseId.level}</p>

                <p>{item.courseId.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;