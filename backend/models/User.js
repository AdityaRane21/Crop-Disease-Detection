const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  location: String,
  phoneNumber: String,
  farmName: String,
  farmSize: String,
  farmType: String,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
