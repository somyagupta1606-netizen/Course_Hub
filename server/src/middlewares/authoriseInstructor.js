const authorizeInstructor = (req, res, next) => {
  try {
    if (req.role !== "instructor") {
      return res
        .status(403)
        .json({ msg: "Only Instructor can Access this route" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authorizeInstructor;