const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI } = require("./config");

const InitiateMongoServer = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
