/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const {
  UserModel,
  RegistrationValidator,
  UpdateValidator,
} = require("../Model/User.Model");
const Auth = require("../Middleware/Auth");

router.get("/", async (req, res) => {
  try {
    const allusers = await UserModel.find();
    res.send({
      status: 200,
      message: "Successfull",
      Users: allusers,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

router.get("/me/:id", async (req, res) => {
  try {
    const me = await UserModel.findById(req.params.id);
    res.send({
      status: 200,
      message: "Successfull",
      userinfo: me,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

router.post("/create_user", async (req, res) => {
  const { error } = RegistrationValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const username = await UserModel.findOne({ username: req.body.username });
    if (username) {
      res.send({
        status: 406,
        message: `username is already Exists`,
      });
    } else {
      const user = new UserModel({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
      await user.save();
      res.send({
        status: 200,
        message: `Successfully Registered`,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      message: ` ${error}`,
    });
  }
});

router.put("/update-user/:id", Auth, async (req, res) => {
  const { error } = UpdateValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const id = await UserModel.findById(req.params.id);
    if (!id) return res.status(400).send({ message: "ID was not found" });
    const salt = await bcrypt.genSalt(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        username: req.body.username,
        password: hashPass,
      },
      { new: true }
    );
    res.send({
      status: 200,
      message: "Successfully Updated",
      updateUser: updateUser,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    res.send({
      status: 200,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

module.exports = router;
