/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const jwt = require("jsonwebtoken");
const Joi = require("Joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

function validate(userSchema) {
  const userValidation = Joi.object({
    name: Joi.string(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return userValidation.validate(userSchema);
}

userSchema.methods.generateAuthToken = async () => {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_ACCESS_TOKEN
  );
  return token;
};

const UserModel = mongoose.model("User", userSchema);

exports.UserModel = UserModel;
exports.validate = validate;
