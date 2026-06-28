import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AddCourse() {
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
      toast.error("Failed To Fetch Categories");
    }
  };

  useEffect(() => {
    getCategories();
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

      let response = await api.post("/courses/add", {
        ...courseData,
        price: Number(courseData.price),
      });

      toast.success(response.data.msg);

      setCourseData({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
        duration: "",
        level: "beginner",
        category: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.msg || "Something Went Wrong");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Course Description"
          rows="4"
          value={courseData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Course Price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={courseData.thumbnail}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (Ex: 10 Hours)"
          value={courseData.duration}
          onChange={handleChange}
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

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;