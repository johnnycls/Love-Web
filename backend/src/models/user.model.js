const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: String,
  password: String,
  loves: [
    {
      phone: { type: String, required: true, trim: true },
      createDate: { type: Date, default: Date.now() },
      expiryDate: Date,
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
