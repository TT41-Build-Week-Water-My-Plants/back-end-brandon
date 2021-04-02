const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//until a router is complete with model, comment it out or nodemon will crash.

// const userRouter = require("./users/user-router");
// const authRouter = require("./auth/auth-router");
// const plantsRouter =require("./plants/plants-router")

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use("api/users", userRouter);
// server.use("api/auth", authRouter);
// server.use("/api/plants", plantsRouter)

server.get("/", (req, res) => {
  res.status(200).json("API is running for your sanity");
});

module.exports = server;
