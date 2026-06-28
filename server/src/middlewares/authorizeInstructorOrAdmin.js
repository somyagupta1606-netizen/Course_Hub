const authorizeInstructorOrAdmin = (req, res, next) => {
  if (req.role === "instructor" || req.role === "admin") {
    return next();
  }

  return res.status(403).json({
    msg: "Access Denied",
  });
};

module.exports = authorizeInstructorOrAdmin;