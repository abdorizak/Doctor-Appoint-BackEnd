/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const { AppointmentModel, validate } = require("../Model/Appointment");
const express = require("express");
const router = express.Router();

router.get("/appointment", async (req, res) => {
  try {
    const AllAppointments = AppointmentModel.find();
    res.send({
      status: 200,
      message: "SuccessFull",
      Appointments: AllAppointments,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});
