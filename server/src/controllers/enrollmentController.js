const enrollmentModel = require("../models/enrollmentModel");
const cartModel = require("../models/cartModel");

// Create Enrollment
const createEnrollment = async (req, res) => {
  try {
    let cart = await cartModel.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    if (cart.courses.length === 0) {
      return res.status(400).json({ msg: "Cart is Empty" });
    }

    let enrollments = [];

    for (let course of cart.courses) {
      let alreadyEnrolled = await enrollmentModel.findOne({
        userId: req.userId,
        courseId: course.courseId,
      });

      if (alreadyEnrolled) {
        return res.status(400).json({ msg: "User already Enrolled" });
      } else {
        let enrollment = await enrollmentModel.create({
          userId: req.userId,
          courseId: course.courseId,
        });

        enrollments.push(enrollment);
      }
    }

    cart.courses = [];
    cart.totalPrice = 0;

    await cart.save();

    return res
      .status(201)
      .json({ msg: "Courses Enrolled Successfully", enrollments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// My Courses
const getMyCourses = async (req, res) => {
  try {
    let courses = await enrollmentModel.find({ userId: req.userId }).populate({
      path: "courseId",
      populate: {
        path: "category",
      },
    });

    if (courses.length === 0) {
      return res.status(404).json({ msg: "No Course Found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { createEnrollment, getMyCourses };