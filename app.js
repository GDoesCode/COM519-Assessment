require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const Employee = require("./Models/Employee");
const Skill = require("./Models/Skill");
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

app.get("/employees.ejs", employeeController.list);

app.listen(WEB_PORT, () => {
  console.log("Assessment app listening at http://localhost:${WEB_PORT}");
});