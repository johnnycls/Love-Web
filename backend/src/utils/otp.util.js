const { TWILIO_SID, TWILIO_AUTH_TOKEN, PHONE } = require("../config");
const client = require("twilio")(TWILIO_SID, TWILIO_AUTH_TOKEN);

exports.generateOTP = (otp_length) => {
  var digits = "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)];
  }
  return OTP;
};

exports.sms = async ({ message, contactNumber }, next) => {
  try {
    const res = await client.messages.create({
      body: message,
      to: contactNumber,
      from: PHONE,
    });
  } catch (error) {
    next(error);
  }
};
