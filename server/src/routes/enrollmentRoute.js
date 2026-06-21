const express = require("express");
const router = express.Router();

const {
  createEnrollment,
  getMyCourses,
} = require("../controllers/enrollmentController");

const authentication = require("../middlewares/auth");

router.post("/create", authentication, createEnrollment);
router.get("/my-courses", authentication, getMyCourses);

module.exports = router;