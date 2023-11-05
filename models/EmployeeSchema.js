const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    position: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    address: String,
    image: String,
    department: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
    salary: {
      type: Number,
    },
    skills: {
      type: [String],
      default: [],
    },
    education: [
      {
        degree: {
          type: String,
          default: "BSc in XYZ",
        },
        university: {
          type: String,
          default: "ABC University",
        },
        graduationYear: {
          type: Number,
          default: 2000,
        }
      }
    ],
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const employees = mongoose.model("employee_datas", employeeSchema);
module.exports = employees;
