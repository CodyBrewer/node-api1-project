// implement your API here
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const PORT = 4000;
server.use(express.json());
server.use(helmet());
server.use(cors());
server.listen(PORT, () => {
  console.log(`...server listening on port: ${PORT}`);
});
