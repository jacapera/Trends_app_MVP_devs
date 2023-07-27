const { JWT_KEY } = require("../config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("./auth/passport-config");
const authenticateUser = require("./middlewares/authenticateUser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const studentRoutes = require("./routes/student.routes");
const searchRoutes = require("./routes/search.routes");
// const professionalRoutes = require("./routes/professional.routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", authenticateUser, userRoutes);
app.use("/api/v1/search", searchRoutes);

// --- solo para pruebas ---
app.use("/students", studentRoutes);
// app.use("/professionals", professionalRoutes);

// -------- Servidor Socket.io-------------------
const { createServer } = require('http');
appSocket = createServer(app);
const serverSocket = require('./sockets/serverSokect');
serverSocket(appSocket);

module.exports = appSocket;
