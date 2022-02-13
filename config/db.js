/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const mongoose = require("mongoose");

const DB = "DoctorAppointment";

async function connectToMongo() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`);
    console.log(`Connected to ${DB}....`);
  } catch (error) {
    console.error(`Failed To connect to ${DB}`, error);
  }
}

module.exports = connectToMongo;
