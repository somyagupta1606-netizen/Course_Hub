const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidContact,
  isValidPassword,
} = require("../utils/validator");
const jwt = require("jsonwebtoken");

// ---------------------------------------------------------------//

// Signup User
const signupUser = async (req, res) => {
  try {
    let userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request ! No Data Provided" });
    }

    let { name, email, contactNo, password, role, profileImage, bio } =
      userData;

    //  Name Validation
    if (!isValid(name)) {
      return res.status(400).json({ msg: "Name is Required" });
    }

    if (name.length < 2 || !isValidName(name)) {
      return res.status(400).json({ msg: "Invalid Name" });
    }

    // Email Validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const duplicateEmail = await userModel.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Contact Number Validation
    if (!isValid(contactNo)) {
      return res.status(400).json({ msg: "Contact Number is Required" });
    }
    if (!isValidContact(contactNo)) {
      return res.status(400).json({ msg: "Invalid Contact Number" });
    }

    const duplicateContact = await userModel.findOne({ contactNo });
    if (duplicateContact) {
      return res.status(400).json({ msg: "Contact Number Already Exists" });
    }

    // Password Validtion
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    // Role Validation
    if (role) {
      if (role !== "student" && role !== "instructor") {
        return res.status(400).json({ msg: "Invalid Role" });
      }
    }

    let User = await userModel.create(userData);
    return res.status(201).json({ msg: "Signup Successfully Done", User });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    let data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { email, password } = data;

    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    let token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    let user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    let userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request ! No Data Provided" });
    }

    let { name, email, contactNo, password, profileImage, bio } = userData;

    if (name) {
      if (!isValid(name)) {
        return res.status(400).json({ msg: "Name is Required" });
      }

      if (name.length < 2 || !isValidName(name)) {
        return res.status(400).json({ msg: "Invalid Name" });
      }
    }

    if (email) {
      if (!isValid(email)) {
        return res.status(400).json({ msg: "Email is Required" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      const duplicateEmail = await userModel.findOne({ email });
      if (duplicateEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
    }

    if (contactNo) {
      if (!isValid(contactNo)) {
        return res.status(400).json({ msg: "Contact Number is Required" });
      }
      if (!isValidContact(contactNo)) {
        return res.status(400).json({ msg: "Invalid Contact Number" });
      }

      const duplicateContact = await userModel.findOne({ contactNo });
      if (duplicateContact) {
        return res.status(400).json({ msg: "Contact Number Already Exists" });
      }
    }

    if (password) {
      if (!isValid(password)) {
        return res.status(400).json({ msg: "Password is Required" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({ msg: "Invalid Password" });
      }

      let hashedPassword = await bcrypt.hash(password, 10);
      userData.password = hashedPassword;
    }

    let updateUser = await userModel.findByIdAndUpdate(
       req.userId ,
      userData,
      { new: true },
    );

    return res
      .status(200)
      .json({ msg: "Profile Updated Successfully", updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { signupUser, loginUser, getProfile, updateProfile };