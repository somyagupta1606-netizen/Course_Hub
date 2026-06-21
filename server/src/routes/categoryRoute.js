const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const authentication = require("../middlewares/auth");
const authorizeAdmin = require("../middlewares/authoriseAdmin");

router.post("/create", authentication, authorizeAdmin, createCategory);
router.get("/get-all", getAllCategories);
router.get("/get/:id", getCategoryById);
router.put("/update/:id", authentication, authorizeAdmin, updateCategory);
router.delete("/delete/:id", authentication, authorizeAdmin, deleteCategory);

module.exports = router;

