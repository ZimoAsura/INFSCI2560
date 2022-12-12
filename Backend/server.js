require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const app = express();
const mongoose = require('mongoose'); 
mongoose.set('strictQuery', true);
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

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

const userRouter = require("./app/routes/user")
app.use('/', userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zimo application." });
});