const User = require("../models/user.model");

const { createJwtToken } = require("../utils/token.util");

const { generateOTP, sms } = require("../utils/otp.util");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getVerificationCode = async (req, res, next) => {
  try {
    const { phone } = req.body;
    let user = await User.findOne({ phone });

    // create new user
    if (!user) {
      const createUser = new User({
        phone,
        loves: [],
      });
      user = await createUser.save();
    }

    // generate otp
    const otp = generateOTP(6);
    user.otp = otp;
    user.isAccountVerified = true;
    await user.save();
    await sms({
      message: `Verification Code of Love Checker: ${otp}`,
      contactNumber: user.phone,
    });

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      phone: user.phone,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { phone, password, otp } = req.body;
    let user = await User.findOne({ phone });

    if (!user) {
      next({ status: 400, message: "User not found" });
      return;
    }

    if (user.otp !== otp) {
      next({ status: 400, message: "incorrect otp" });
      return;
    }

    user.otp = "";
    await bcrypt.hash(password, saltRounds, function (err, hash) {
      user.password = hash;
      user.save();
    });

    const token = createJwtToken({ userId: user.phone });

    res.status(201).json({
      type: "success",
      message: "registered",
      phone: user.phone,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password, phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      next({ status: 400, message: "User not found" });
      return;
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = createJwtToken({ userId: user.phone });

        res.status(201).json({
          type: "success",
          message: "password verified successfully",
          token,
          userId: user.phone,
        });
      } else {
        next({ status: 400, message: "User not found" });
        return;
      }
    });
  } catch (error) {
    next(error);
  }
};
