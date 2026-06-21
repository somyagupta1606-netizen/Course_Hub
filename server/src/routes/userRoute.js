const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authentication = require("../middlewares/auth");

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", authentication, getProfile);
router.put("/update-profile", authentication, updateProfile);

module.exports = router;