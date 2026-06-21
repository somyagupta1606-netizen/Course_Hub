const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/auth");
const authorizeInstructor = require("../middlewares/authoriseInstructor");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.post("/add", authentication, authorizeInstructor, createCourse);
router.get("/all", getAllCourses);
router.get("/get-course/:id", getCourseById);
router.put("/update/:id", authentication, authorizeInstructor, updateCourse);
router.delete("/delete/:id", authentication, authorizeInstructor, deleteCourse);

module.exports = router;