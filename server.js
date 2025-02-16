const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToMongodb = require("./utils/connectToMongodb.js");
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const savePath = require('path').join(__dirname, '/app_data');
const { PORT } = require("./config");

connectToMongodb();

app.use(express.json());

app.use(fileUpload());

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Images / Files middleware
app.use(express.static(path.join(__dirname, "/app_data")));

app.use(express.static("client/build"));

//Route to employees
const employeesRouter = require("./routers/employees");
app.use("/employees", employeesRouter);

app.listen(PORT, () => {
	console.log("Server Started");
});