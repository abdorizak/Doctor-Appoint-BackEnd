const mongoose = require("mongoose");
const { UserModel, validate } = require("../Model/User.Model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const userInfo = await UserModel.findOne({ username: req.body.username });
    if (!userInfo) return res.status(404).send({ message: "Invalid username" });
    const validatePassword = await bcrypt.compare(
      req.body.password,
      userInfo.password
    );
    if (!validatePassword) return res.send({ message: "Invalid password" });
    // Generate Token and pass though header
    const token = await userInfo.generateAuthToken();
    res.header("authorization", token).json({
      success: true,
      userInfo: userInfo,
      token: token,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

module.exports = router;
