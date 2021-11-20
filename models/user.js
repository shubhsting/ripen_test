const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: String,
  phone_number: String,
  is_verified: {
    type: Boolean,
    default: false
  },
  ts: String
});

exports.User = mongoose.model("user", schema);
