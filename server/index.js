require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const studentRouter = require("./routes/students");
const cors = require("cors");

//  initialize express for use
const app = express();

// cors
app.use(cors());

//  routes
app.get("/", (req, res) => {
  res.send("<h1>Hello World :) :)</h1>");
});

// app.get("/", (req, res) => {
//   res.send(path.join(__dirname, "public", "index.html"));
// });

//  init middleware
app.use(logger);

//  body parser
app.use(express.json());

//  for form submission with post
// app.use(express.urlencoded({ extended: false }));

//  routes for students
app.use("/api/students", studentRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
