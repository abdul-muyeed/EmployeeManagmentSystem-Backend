const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try{
    const token = req.cookies.access_token;
    // if there is any token 
  if (!token) next({ status: 401, message: "You need to Login" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // if there is any error
      if (err) next({ status: 401, message: err.message });
      // sending the user object to the next middleware
      req.user = user;
      next();
  })
  }catch(err){
    next(err);
  }
  
}

module.exports = verifyToken;