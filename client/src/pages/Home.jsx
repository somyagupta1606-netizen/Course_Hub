import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      let response = await api.get("/courses/all");
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Failed To Fetch Courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">All Courses</h1>

      {courses.length === 0 ? (
        <h2>No Courses Found</h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;