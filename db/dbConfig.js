const mongoose = require("mongoose");
require("dotenv").config();
exports.connectToDB = () => {
  return mongoose.connect(process.env.DB_URL);
};
