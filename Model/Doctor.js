const Joi = require("joi");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    availiable: String,
    experience: String,
    tell: Number,
    description: String,
    certificate: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { Timestamp: true }
);

function validation(doctor) {
  const doctorValidation = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    availiable: Joi.string().required(),
    experience: Joi.string().required(),
    tell: Joi.number().min(4).required(),
    description: Joi.string().required(),
    certificate: Joi.string().required(),
    categoryId: Joi.string().required(),
  });

  return doctorValidation.validate(doctor);
}

const DoctorModel = mongoose.model("DoctorModel", doctorSchema);

exports.validation = validation;
exports.DoctorModel = DoctorModel;
