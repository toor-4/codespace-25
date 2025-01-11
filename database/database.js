const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to database: ${conn.connection.host}`);
  }
  catch (error) {
    console.error(`error_message': ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;