require("dotenv").config();
const md5 = require("md5");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");


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

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});