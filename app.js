require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

// Controllers

const employeeController = require("./Controllers/employee");


const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/employees", employeeController.list);
app.get("/employees/delete/:id", employeeController.delete);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});