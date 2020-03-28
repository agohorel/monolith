const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router.js");
const corsOptions = {
  origin: "*",
  credentials: true
};

const server = express();

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.use("/api/auth", authRouter);

module.exports = server;
