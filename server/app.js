const cors = require("cors");
const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(
  cors({
    origin: "*",
  })
);

const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

module.exports = app;
