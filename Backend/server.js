require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRouter = require("./app/routes/user")
const User = require('./app/models/user')

const app = express();
// set port, listen for requests
const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', true);

const database = require("./app/models");
database.mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.log("MongoDB connection error", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  console.log(accessToken)
  const { id, exp } = await jwt.verify(accessToken, process.env.SECRET);
  // const decoded = await jwt.verify(accessToken, process.env.SECRET)
  // console.log("app use:", userId, decoded)
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(id); 
  next();
 } else { 
  next(); 
 } 
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Zimo application." });
// });