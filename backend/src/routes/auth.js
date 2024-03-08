const router = require("express").Router();
const rateLimiter = require("../middlewares/rateLimiter");

const {
  getVerificationCode,
  register,
  login,
} = require("../controllers/auth.controller");

router.post("/getverificationcode/", rateLimiter, getVerificationCode);

router.post("/register/", register);

router.post("/login/", login);

module.exports = router;
