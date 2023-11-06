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
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "https://picsum.photos/200",
    },
    department: {
      type: String,
      default: "",
    },
    joiningDate: {
      type: Date,
    },
    salary: {
      type: Number,
      default: 0,
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
