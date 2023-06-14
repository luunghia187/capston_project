var express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
var cookies = require("cookie-parser");
var app = express();

dotenv.config();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookies());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

//cac router
require("./src/routers/chungChi.router")(app);
require("./src/routers/login.router")(app);

app.listen(5000, function () {
    console.log("Server listening on http://localhost:5000");
  });