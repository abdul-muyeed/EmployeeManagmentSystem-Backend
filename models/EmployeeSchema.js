const mongoose = require('mongoose')

    const employeeSchema = new mongoose.Schema({
        id: Number,
        firstName: String,
        lastName: String,
        age: Number,
        position: String,
        email: String,
        phone: String,
        address: String,
        image: String,
        department: String,
        joiningDate: String,
        salary: Number,
        skills: Array,
        education: Array,
    })

    const employees = mongoose.model('employee_datas', employeeSchema)
    module.exports = employees