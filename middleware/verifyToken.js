const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next({ status: 401, message: "You need to Login" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(err);
      req.user = user;
      next();
  })
}

module.exports = verifyToken;