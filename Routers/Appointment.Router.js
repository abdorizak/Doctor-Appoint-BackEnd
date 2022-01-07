/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const express = require("express");
const router = express.Router();
const { AppointmentModel, validate } = require("../Model/Appointment.Model");
const Auth = require("../Middleware/Auth");
router.use(Auth);

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

router.post("/make-appointment", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    const makeAppointment = new AppointmentModel();
    const result = await makeAppointment.save();
    res.send({
      status: 200,
      message: "SuccessFull",
      Appointment: result,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error : ${error}`,
    });
  }
});

router.delete("/delete-Appointment/:id", async (req, res) => {
  try {
    const deleteAppointment = await AppointmentModel.findByIdAndDelete(
      req.params.id
    );
    res.send({
      status: 200,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error : ${error}`,
    });
  }
});
