const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //I authorize to receive requests from this domain http://localhost/5173
  res.header("Access-Control-Allow-Credentials", true); //I authorize to receive requests that include the header with credentials
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //I authorize to recive requests with these headers
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //i authorize requests: GET POST PUT DELETE OPTIONS
  next();
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);

module.exports = app;
