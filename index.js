require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const employeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");
const port = process.env.PORT;

MongoDB();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors());
app.use("/api/employee", employeeRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port}/`)
);
