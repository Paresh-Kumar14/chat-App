const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: 'string', required: true, minlength: 3, maxlength: 30 },
    email: { type: 'string', required: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: 'string', required: true, minlength: 3, maxlength: 1024 },

}, { timestamps : true });

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;