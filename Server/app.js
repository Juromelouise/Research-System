const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const user = require("./routes/user");
const forum = require("./routes/forum");
const products = require("./routes/product");
const comment = require("./routes/comment");
const order = require("./routes/order");
const chart = require("./routes/analytics");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/v1", user);
app.use("/api/v1", products);
app.use("/forum", forum);
app.use("/comment", comment);
app.use("/order", order);
app.use("/chart", chart);

module.exports = app;
