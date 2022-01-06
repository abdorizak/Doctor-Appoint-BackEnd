/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const connectToMongo = require("./config/db");
const Auth = require("./Routers/Auth");
const User = require("./Routers/User.Router");
const category = require("./Routers/Category.Router");
const doctors = require("./Routers/Doctor.Router");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

connectToMongo();

app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/category", category);
app.use("/api/doctors", doctors);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listing on port ${port} ......`);
});
