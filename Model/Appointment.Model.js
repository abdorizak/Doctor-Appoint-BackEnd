/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const mongoose = require("mongoose");
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema({
  // userID DoctorID Time Cabasho
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "DoctorModel" },
  appointmentTime: { type: Date, default: Date.now() },
  description: String,
});

function validate(appointmentSchema) {
  const appointmentValidation = Joi.object({
    userId: Joi.string().required(),
    doctorId: Joi.string().required(),
    appointmentTime: Joi.string().required(),
    description: Joi.string().required(),
  });

  return appointmentValidation.validate(appointmentSchema);
}

const AppointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

exports.AppointmentModel = AppointmentModel;
exports.validate = validate;
