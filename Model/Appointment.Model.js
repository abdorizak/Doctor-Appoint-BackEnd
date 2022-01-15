/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const mongoose = require("mongoose");
const Joi = require("joi");

const appointmentSchema = new mongoose.Schema(
  {
    phoneNumber: String,
    description: String,
    appointmentTime: {
      type: Date,
      default: Date.now,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "DoctorModel" },
  },
  { Timestamp: true }
);

function validate(appointmentSchema) {
  const appointmentValidation = Joi.object({
    user: Joi.string().required(),
    doctor: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    description: Joi.string().required(),
    appointmentTime: Joi.string(),
  });
  return appointmentValidation.validate(appointmentSchema);
}

const AppointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

exports.AppointmentModel = AppointmentModel;
exports.validate = validate;
