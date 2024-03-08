const express = require("express");
const cors = require("cors");
const InitiateMongoServer = require("./db");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const { PORT } = require("./config");

InitiateMongoServer();

const app = express();
const port = PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "Api endpoint does not found",
  };
  next(error);
});

app.listen(port, () => {
  console.log(`${port}`);
});
