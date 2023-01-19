require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

// Controllers

const employeeController = require("./Controllers/employee");
const skillController = require("./Controllers/skill");

const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

mongoose.connection.on("error", (err) => {
  console.error(err);
  console.error("Connection Error");
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

// Employee functions
app.get("/employees", employeeController.list);

app.post("/addEmployee", employeeController.create);
app.get("/addEmployee", (req, res) => {
  res.render("addEmployee", {errors: {}});
});

app.get("/employees/delete/:id", employeeController.delete);

// Skill functions
app.get("/skills", skillController.list);
app.get("/skills/delete/:id", skillController.delete);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});