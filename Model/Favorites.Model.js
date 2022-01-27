const Joi = require("joi");
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorModel",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { Timestamp: true }
);

const validation = (favoriteSchema) => {
  const favoriteValidation = Joi.object({
    doctorID: Joi.string().required(),
    userID: Joi.string().required(),
  });
  return favoriteValidation.validate(favoriteSchema);
};

const FavoriteModel = mongoose.model("FavoriteModel", favoriteSchema);

exports.FavoriteModel = FavoriteModel;
exports.validation = validation;
