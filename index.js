require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const MongoDB = require("./config/connectDB");
const Employees = require("./models/EmployeeSchema");
const hashPassword = require("./config/bcrypt");
const cookieParser = require("cookie-parser");
const Admins = require("./models/Admins");
const auth = require("./middleware/auth");

MongoDB()
app.use(cookieParser());
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
app.get("/employees", async (req, res) =>{
    try{
        const employees = await Employees.find()
        return res.status(200).json(employees)
    }catch(err){
        return res.status(500).json({message:err.message}) 
    }
    

});

app.get("/token", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No Token Found" });

  
  const user = await jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => { 
    if (decode) return decode;

    if (err.message === "jwt expired") { 
      return res.status(401).json({ message: "Token has expired" });
    }
  })
  return res.status(200).json( user);
})

app.get("/employee/:id", async (req, res) =>{
  try{ 
      const employee = await Employees.findById(req.params.id)
      res.status(200).json(employee)

  }catch(err){
    res.status(500).json({message:err.message})
  }

})

app.post("/add",auth, async (req, res) => {
  const pass = await hashPassword(req.body.password)
  const employee = {
      position: req.body.position,
      email: req.body.email,
      department: req.body.department,
      joiningDate: req.body.joiningDate,
      salary: req.body.salary,
      password: pass
  }
  const newEmployee = new Employees(employee);
  try {
      await newEmployee.save();
      res.status(201).json(newEmployee);
  } catch (err) {
      res.status(409).json({ message: err.message });
  }
})

// app.put("/update/:id", async (req, res) => {
  

//   try {
//     const employee ={
//         id: req.body.id,
//         firstName: req.body.fname,
//         lastName: req.body.lname,
//         age: req.body.age,
//         position: req.body.position,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address,
//         image: req.body.image,
//         department: req.body.department,
//         joiningDate: req.body.joiningDate,
//         salary: req.body.salary,
//         skills: req.body.skills,
//         education: req.body.education,
//         password: req.body.password,
//     }
    
      
//        const newemployee = await Employees.findByIdAndUpdate(req.params.id,employee,{new: true})
//       if (newemployee) {
       
//           res.status(200).json(newemployee);

//       } else {
//           res.status(404).json({ message: "Employee not found" });
//       }
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// })

app.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await Employees.findOne({ email });
    
    if (!user) {
      return res.status(403).json({ message: "User not found"});
    }
    if(user.password){
      if(!bcrypt.compareSync(password, user.password)){
        return res.status(404).json({ message: "Password incorrect"});
      }
    }else{
      return res.status(405).json({ message: "Password not set by admin"})
    }
    
    const token = jwt.sign({ id: user._id, name: user.firstName, role: "Employee" }, process.env.JWT_SECRET, { expiresIn: '30m' });
      
    return res.status(200).cookie("token", token, {expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))}).json({ message: "Login successful" });
      
    }catch (err) {
      return res.status(500).json({ message: err.message });
    }
})

app.post("/edit/:id",auth, async (req, res) => {
  try {
    const employee = req.body
       const newemployee = await Employees.findByIdAndUpdate(req.params.id,employee,{new: true})
      if (newemployee) {
          res.status(201).json(newemployee);

      } else {
          res.status(404).json({ message: "Employee not found" });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
})

app.delete("/delete/:id",auth, async (req, res) => {
  try {
      const employee = await Employees.findByIdAndDelete(req.params.id)
      if (employee) {
          res.status(200).json({ message: "Employee deleted" });
      } else {
          res.status(404).json({ message: "Employee not found" });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
})

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
})






















app.listen(port, () => console.log(`App listening on port http://localhost:${port}/`));