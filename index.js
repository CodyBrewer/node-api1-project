// implement your API here
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./data/db");

const server = express();
const PORT = 4000;
server.use(express.json());
server.use(helmet());
server.use(cors());
server.listen(PORT, () => {
  console.log(`...server listening on port: ${PORT}`);
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.findById(id);
    user
      ? res.status(200).json({ success: true, user })
      : res
          .status(400)
          .json({ success: false, message: "no user found by that id" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

server.post("/api/users", async (req, res) => {
  const newUser = req.body;
  try {
    const insertedUser = await db.insert(newUser);
    res.status(201).json({ success: true, newUserId: insertedUser });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
