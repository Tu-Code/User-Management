const bcrypt = require('bcryptjs');
const { User } = require("../models/User");

module.exports.create = async (body) => {
    const saltRounds = 10;
  
    if (await User.findOne({ email: new RegExp(body.email, "i") })) {
      return null;
    }
  
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  
    const newUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword
    });
  
    return await newUser.save();
  };