import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    duration: "",
    level: "beginner",
    category: "",
  });

  const getCategories = async () => {
    try {
      let response = await api.get("/categories/get-all");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      let response = await api.get(`/courses/get-course/${id}`);
      let course = response.data.course;
      setCourseData({
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnail: course.thumbnail,
        duration: course.duration,
        level: course.level,
        category: course.category._id,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Course Not Found");
    }
  };

  useEffect(() => {
    getCategories();
    getCourse();
  }, []);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response = await api.put(`/courses/update/${id}`, {
        ...courseData,
        price: Number(courseData.price),
      });

      toast.success(response.data.msg);
      navigate("/instructor/my-courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Update Course</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          rows="4"
          value={courseData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="thumbnail"
          value={courseData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="duration"
          value={courseData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full border p-3 rounded"
        />

        <select
          name="level"
          value={courseData.level}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>

        <button className="w-full bg-green-600 text-white py-3 rounded">
          Update Course
        </button>
      </form>
    </div>
  );
}

export default UpdateCourse;