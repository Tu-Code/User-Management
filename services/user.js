const bcrypt = require('bcryptjs');
const { User } = require("../models/User");

module.exports.create = async (body) => {
  if (await User.findOne({ email: new RegExp(body.email, "i") })) {
    return null;
  }
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hashedPassword
  });

  return await newUser.save();
};

module.exports.findOneById = async (id) => await User.findById(id);

module.exports.updatePassword = async (userId, newPassword) => {
  let user = await User.findOne({ _id: userId });

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(newPassword, user.password);

  if (isMatch) {
    return null;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        password: hashedPassword,
      },
    },
    { new: true }
  );
};