const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:db");

const dbURI = `${config.get("MONGODB_URI")}/scatch`;

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
