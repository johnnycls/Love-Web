const User = require("../models/user.model");

const { verifyJwtToken } = require("../utils/token.util");

module.exports = async (req, res, next) => {
  try {
    // check for auth header from client
    const header = req.headers.authorization;

    if (!header) {
      next({ status: 403, message: "auth header is missing" });
      return;
    }

    // verify auth token
    const token = header;

    if (!token) {
      next({ status: 403, message: "auth token is missing" });
      return;
    }

    const userId = verifyJwtToken(token, next);

    if (!userId) {
      next({ status: 403, message: "incorrect token" });
      return;
    }

    const user = await User.findOne({ phone: userId });

    if (!user) {
      next({ status: 404, message: "User not found" });
      return;
    }

    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
