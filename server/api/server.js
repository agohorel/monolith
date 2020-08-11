const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router.js");
const patchRouter = require("../patches/patch-router.js");
const versionRouter = require("../versions/version-router.js");

const corsOptions = {
  origin: "*",
  credentials: true,
};

const server = express();

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/patches", patchRouter);
server.use("/api/versions", versionRouter);

module.exports = server;
