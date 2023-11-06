const express = require("express");
const { getEmployees, addEmployee, editEmployee, getEmployee, deleteEmployee } = require("../controllers/employee");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();





router.get("/",getEmployees);
router.get('/:id',getEmployee)

// need verify token to access this route
router.post('/add',verifyToken,addEmployee)
router.post('/edit/:id',verifyToken,editEmployee)
router.delete('/delete/:id',verifyToken,deleteEmployee)



module.exports = router;