const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const authentication = require("../middlewares/auth");
const authorizeAdmin = require("../middlewares/authoriseAdmin");

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", authentication, getProfile);
router.put("/update-profile", authentication, updateProfile);
router.delete("/delete-profile", authentication, deleteProfile);

router.get("/all-users", authentication, authorizeAdmin, getAllUsers);
router.delete("/delete-user/:id", authentication, authorizeAdmin, deleteUser);

module.exports = router;