const courseModel = require("../models/courseModel");
const categoryModel = require("../models/categoryModel");
const { isValid, isValidObjectId } = require("../utils/validator");

// Create Courses
const createCourse = async (req, res) => {
  try {
    let courseData = req.body;
    if (!courseData || Object.keys(courseData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { title, description, price, thumbnail, duration, level, category } =
      courseData;

    // Title Validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Title is Required" });
    }

    // Description Validation
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Description is Required" });
    }

    // Price Validation
    if (!isValid(price) || typeof price !== "number") {
      return res.status(400).json({ msg: "Valid Price is Required" });
    }

    // Duration Validation
    if (!isValid(duration)) {
      return res.status(400).json({ msg: "Duration is Required" });
    }

    // Level Validation
    if (level) {
      if (
        level !== "beginner" &&
        level !== "intermediate" &&
        level !== "advanced"
      ) {
        return res.status(400).json({ msg: "Invalid Level" });
      }
    }

    // Category Validation
    if (!isValidObjectId(category)) {
      return res.status(400).json({ msg: "Invalid Category" });
    }
    let categoryData = await categoryModel.findById(category);
    if (!categoryData) {
      return res.status(404).json({ msg: "Category Not Found" });
    }

    courseData.instructorId = req.userId;

    let course = await courseModel.create(courseData);
    return res.status(201).json({ msg: "Course Added Suceessfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    let courses = await courseModel
      .find()
      .populate("category", "categoryName")
      .populate("instructorId", "name email");
    if (courses.length === 0) {
      return res.status(404).json({ msg: "No Courses Found" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Course By Id
const getCourseById = async (req, res) => {
  try {
    let courseId = req.params.id;

    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ msg: "Invalid CourseId" });
    }

    let course = await courseModel
      .findById(courseId)
      .populate("category", "categoryName")
      .populate("instructorId", "name email");

    if (!course) {
      return res.status(404).json({ msg: "Course Not Found" });
    }

    return res.status(200).json({ course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    let courseId = req.params.id;
    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ msg: "Invalid CourseId" });
    }

    let courseData = req.body;
    if (!courseData || Object.keys(courseData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { title, description, price, thumbnail, duration, level, category } =
      courseData;

    if (title) {
      if (!isValid(title)) {
        return res.status(400).json({ msg: "Title is Required" });
      }
    }

    if (description) {
      if (!isValid(description)) {
        return res.status(400).json({ msg: "Description is Required" });
      }
    }

    if (price) {
      if (!isValid(price) || typeof price !== "number") {
        return res.status(400).json({ msg: "Valid Price is Required" });
      }
    }

    if (duration) {
      if (!isValid(duration)) {
        return res.status(400).json({ msg: "Duration is Required" });
      }
    }

    if (level) {
      if (
        level !== "beginner" &&
        level !== "intermediate" &&
        level !== "advanced"
      ) {
        return res.status(400).json({ msg: "Invalid Level" });
      }
    }

    if (category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({ msg: "Invalid Category" });
      }
      let categoryData = await categoryModel.findById(category);
      if (!categoryData) {
        return res.status(404).json({ msg: "Category Not Found" });
      }
    }

    let updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      courseData,
      { new: true },
    );
    if (!updatedCourse) {
      return res.status(404).json({ msg: "Course Not Found" });
    }

    return res
      .status(200)
      .json({ msg: "Course Updated Successfully", updatedCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    let courseId = req.params.id;
    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ msg: "Invalid CourseId" });
    }

    let course = await courseModel.findByIdAndDelete(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ msg: "Course Not Found or already deleted" });
    }

    return res.status(200).json({ msg: "Course Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Instructor Courses
const getInstructorCourses = async (req, res) => {
  try {
    let courses = await courseModel
      .find({ instructorId: req.userId })
      .populate("category", "categoryName");

    if (courses.length === 0) {
      return res.status(404).json({ msg: "No Courses Found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
};
