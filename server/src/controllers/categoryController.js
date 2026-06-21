const categoryModel = require("../models/categoryModel");
const { isValid, isValidObjectId } = require("../utils/validator");

// Create Category
const createCategory = async (req, res) => {
  try {
    let data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { categoryName } = data;

    // Category Name Validation
    if (!isValid(categoryName)) {
      return res.status(400).json({ msg: "Category Name is Required" });
    }

    let categoryExists = await categoryModel.findOne({ categoryName });
    if (categoryExists) {
      return res.status(400).json({ msg: "Category Already Exists" });
    }

    let Category = await categoryModel.create(data);
    return res
      .status(201)
      .json({ msg: "Category Created Successfully", Category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get All Category
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (categories.length === 0) {
      return res.status(404).json({ msg: "No Categories Found" });
    }
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Category By Id
const getCategoryById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    }

    let category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category Not Found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    let categoryId = req.params.id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    }

    let data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { categoryName } = data;
    if (categoryName) {
      if (!isValid(categoryName)) {
        return res.status(400).json({ msg: "Category Name is Required" });
      }
    }

    let categoryExists = await categoryModel.findOne({ categoryName });
    if (categoryExists) {
      return res.status(400).json({ msg: "Category Already Exists" });
    }

    let Update = await categoryModel.findByIdAndUpdate(categoryId, data, {
      new: true,
    });

    if (!Update) {
      return res.status(404).json({ msg: "Category Not Found" });
    }

    return res
      .status(200)
      .json({ msg: "Category Updated Successfully", Update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    let categoryId = req.params.id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    }

    let Delete = await categoryModel.findByIdAndDelete(categoryId);
    if (!Delete) {
      return res
        .status(404)
        .json({ msg: "Category Not Found or already Deleted" });
    }
    return res.status(200).json({ msg: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};