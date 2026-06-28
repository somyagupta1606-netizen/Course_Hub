import { NavLink } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={
          course.thumbnail || "https://placehold.co/400x250?text=Course+Image"
        }
        alt={course.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h2>

        <p className="text-gray-600 mb-2">Duration: {course.duration}</p>

        <p className="text-gray-600 mb-2 capitalize">Level: {course.level}</p>

        <p className="text-gray-600 mb-2">
          Category: {course.category.categoryName}
        </p>

        <p className="text-gray-600 mb-4">
          Instructor: {course.instructorId.name}
        </p>

        <p className="text-green-600 text-2xl font-bold mb-4">
          ₹{course.price}
        </p>

        <NavLink
          to={`/course/${course._id}`}
          className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default CourseCard;