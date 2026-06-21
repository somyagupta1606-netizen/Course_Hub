const cartModel = require("../models/cartModel");
const courseModel = require("../models/courseModel");

const { isValidObjectId } = require("../utils/validator");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    let { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ msg: "Course Id is Required" });
    }

    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ msg: "Invalid Course Id" });
    }

    let course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course Not Found" });
    }

    let cart = await cartModel.findOne({ userId: req.userId });
    if (!cart) {
      cart = await cartModel.create({
        userId: req.userId,
        courses: [{ courseId }],
        totalPrice: course.price,
      });
    } else {
      let alreadyAdded = cart.courses.find(
        (item) => item.courseId.toString() === courseId,
      );

      if (alreadyAdded) {
        return res.status(400).json({ msg: "Course Already Added To Cart" });
      }

      cart.courses.push({ courseId });
      cart.totalPrice = cart.totalPrice + course.price;

      await cart.save();
    }

    return res
      .status(201)
      .json({ msg: "Course Added to Cart Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    let cart = await cartModel
      .findOne({ userId: req.userId })
      .populate("courses.courseId");

    if (!cart) {
      return res.status(404).json({ msg: "Cart is Empty" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
  try {
    let courseId = req.params.id;

    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ msg: "Invalid Course Id" });
    }

    let cart = await cartModel.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart is Empty" });
    }

    let course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course Not Found" });
    }

    cart.courses = cart.courses.filter(
      (item) => item.courseId.toString() !== courseId,
    );
    cart.totalPrice = cart.totalPrice - course.price;

    await cart.save();
    return res.status(200).json({ msg: "Course Removed From Cart", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };

