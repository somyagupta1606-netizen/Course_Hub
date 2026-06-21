const authorizeAdmin = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ msg: "Only Admin can Access this route" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authorizeAdmin;