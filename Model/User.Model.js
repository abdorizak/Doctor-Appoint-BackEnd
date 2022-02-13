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

function RegistrationValidator(user) {
  const userValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return userValidation.validate(user);
}

function UpdateValidator(user) {
  const userUpdateValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return userUpdateValidation.validate(user);
}

function LoginValidator(user) {
  const userLoginValidator = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return userLoginValidator.validate(user);
}

userSchema.methods.generateAuthToken = async () => {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.SECRET_ACCESS_TOKEN
  );
  return token;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
  RegistrationValidator,
  LoginValidator,
  UpdateValidator,
};
