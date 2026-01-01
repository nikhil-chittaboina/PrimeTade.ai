

const checkRole = (allowedRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;                  //comes from auth middleware

    if (!userRole) {
      return res.status(401).json({
        error: "Unauthorized: user role missing"
      });
    }

    if (userRole !== allowedRole) {               // allowed role comes from the closure 
      return res.status(403).json({
        error: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

module.exports = checkRole;