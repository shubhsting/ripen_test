const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  utm_source: String,
  event: String,
  count: Number
});

exports.User_Event = mongoose.model("user_events", schema);
