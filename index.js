require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const MongoDB = require("./config/connectDB");
const Employees = require("./models/EmployeeSchema");
MongoDB()
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(
  cors(
    (origin = process.env.ORIGIN),
    (credentials = true),
    (methods = ["GET", "POST", "PUT", "DELETE"])
  )
);

app.get("/", (req, res) => res.send("Hello  World! "));
app.get("/employee", async (req, res) =>{
    try{
        const employees = await Employees.find()
        res.status(200).json(employees)
    }catch(err){
        res.status(500).json({message:err.message}) 
    }
    

});
// app.post("/employee", async (req, res) => {
//     const employee = req.body;
//     const newEmployee = new Employees(employee);
//     try {
//         await newEmployee.save();
//         res.status(201).json(newEmployee);
//     } catch (err) {
//         res.status(409).json({ message: err.message });
//     }
// })






















app.listen(port, () => console.log(`App listening on port http://localhost:${port}/`));