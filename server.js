const connectToMongo = require("./config/db");
const category = require("./Routers/Category");
const doctors = require("./Routers/Doctor");
const express = require("express");
const app = express();

app.use(express.json());

connectToMongo();

app.use("/api", category);
app.use("/api", doctors);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listing on port ${port} ......`);
});
