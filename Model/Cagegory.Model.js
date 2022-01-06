/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: String,
  categoryImage: String,
});

function validate(categorySchema) {
  const categoryValidation = Joi.object({
    categoryName: Joi.string().required(),
    categoryImage: Joi.string().required(),
  });
  return categoryValidation.validate(categorySchema);
}

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validate = validate;
