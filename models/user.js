const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:  {
        type: String,
        required: true,
        min: 100
    }, 
    lastName:  {
        type: String,
        required: true,
        min: 100
    },
    email:    {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    userSchema,
};

