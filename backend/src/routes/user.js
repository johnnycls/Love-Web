const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const { getLoves, createLove } = require("../controllers/user.controller");

router.get("/", checkAuth, getLoves);

router.patch("/", checkAuth, createLove);

module.exports = router;
