const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employees = require("../models/EmployeeSchema");

const signin = async (req, res, next) => {
  try {
    const user = await employees.findOne({ email: req.body.email });
    console.log(user);
    if (!user) next({ status: 404, message: "User not found" });

    const { password, ...others } = user._doc;
    if (req.body.password) {

      if (!bcrypt.compareSync(req.body.password, password)) next({ status: 401, message: "Incorrect password" });

    } else {
      next();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

const signout = (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = { signin, signout };
