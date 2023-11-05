const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String
})

const admins = mongoose.model('admins', adminSchema)
module.exports = admins