const mongoose = require("mongoose");
require('dotenv').config(); // Ensure this is at the top if not already
const dbgr = require("debug")("development:db");

const dbURI = `${process.env.MONGODB_URI}/scatch`;

const options = {
  serverSelectionTimeoutMS: 20000,
};

mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("MongoDB connection established successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;