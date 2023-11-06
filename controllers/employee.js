const bcrypt = require("bcryptjs");
const Employees = require("../models/EmployeeSchema.js");

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employees.find();
    return res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};
const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employees.findById(req.params.id);
    // saparating password from the user object
    const { password, ...others } = employee._doc;
    return res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
const addEmployee = async (req, res, next) => {
  try {
    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // addong hased password to the request body
    const newEmployee = new Employees({ ...req.body, password: hash });
    await newEmployee.save();
    return res.status(200).json(newEmployee);
  } catch (err) {
    next(err);
  }
};

const editEmployee = async (req, res, next) => {
  try {
    if (req.body.password) {
      // hashing the password
      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
      const hash = bcrypt.hashSync(req.body.password, salt);

      req.body.password = hash;
    }

    const employee = req.body;
    // updating the employee
    const newemployee = await Employees.findByIdAndUpdate(
      req.params.id,
      employee,
      { new: true }
    );
    if (newemployee) {
      return res.status(201).json(newemployee);
    } else {
        next({ status: 404, message: "Employee not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    // deleting the employee
    const employee = await Employees.findByIdAndDelete(req.params.id);
    if (employee) {
      return res.status(204).json({ message: "Employee deleted" });
    } else {
      next({ status: 404, message: "Employee not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  editEmployee,
  getEmployee,
  deleteEmployee,
};
