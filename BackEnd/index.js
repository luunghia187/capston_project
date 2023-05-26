var express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");
var cookies = require("cookie-parser");
var app = express();

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

app.listen(5000, function () {
    console.log("Server listening on http://localhost:5000");
  });