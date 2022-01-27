/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const Joi = require("joi");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    title: String,
    price: String,
    availiable: String,
    patients: String,
    experience: String,
    certificate: String,
    description: String,
    tell: Number,
    isFavorited: Boolean,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { Timestamp: true }
);

function validation(doctor) {
  const doctorValidation = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.string().required(),
    availiable: Joi.string().required(),
    patients: Joi.string().required(),
    experience: Joi.string().required(),
    certificate: Joi.string().required(),
    tell: Joi.number().min(4).required(),
    description: Joi.string().required(),
    isFavorited: Joi.boolean().required(),
    categoryId: Joi.string().required(),
  });

  return doctorValidation.validate(doctor);
}

const DoctorModel = mongoose.model("DoctorModel", doctorSchema);

exports.validation = validation;
exports.DoctorModel = DoctorModel;
