const mongodbConfig = require("../config/db.config.js");
const mongoose = require("mongoose"); 

const database = {
    mongoose: mongoose,
    url: mongodbConfig.url
}

module.exports = database;