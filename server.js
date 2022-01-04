/*
 * Copyright (c) 2022
 * @ author:  Abdorizak Abdalla aka (Xman)
 */
const connectToMongo = require("./config/db");
const Auth = require("./Routers/Auth");
const User = require("./Routers/User");
const category = require("./Routers/Category");
const doctors = require("./Routers/Doctor");
const express = require("express");
const app = express();

app.use(express.json());

connectToMongo();

app.use("/api", Auth);
app.use("/api", User);
app.use("/api", category);
app.use("/api", doctors);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listing on port ${port} ......`);
});
