const Joi = require("Joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

function validate(userSchema) {
  const userValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return userValidation.validate(userSchema);
}

const UserModel = mongoose.model("User", userSchema);

exports.UserModel = UserModel;
exports.validate = validate;
