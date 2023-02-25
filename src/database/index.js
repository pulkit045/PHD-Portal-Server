const mongoose = require("mongoose");
const { mongoUri, configObj } = require("./dbConfig");

const connectToDB = async () => {
  // connect to DB and pass custom configuration
  try {
    await mongoose.connect(mongoUri, configObj);
  } catch (err) {
    console.log("Error in connecting to database:");
    throw err;
  }
};

module.exports = { connectToDB };
