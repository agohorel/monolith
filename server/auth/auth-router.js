const db = require("../db/dbModel.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils.js");
const {
  validateRegisterCreds,
  validateLoginCreds
} = require("../middleware/validateCreds.js");

router.post("/register", validateRegisterCreds, async (req, res) => {
  const data = req.body;
  const hash = bcrypt.hashSync(data.password, 12);
  data.password = hash;
  try {
    const user = await db.insert("users", data, "id");
    const token = generateToken(user);
    res.status(201).json({ username: user.username, id: user.id, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error :(" });
  }
});

router.post("/login", validateLoginCreds, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy("users", { username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(201).json({ username: user.username, id: user.id, token });
    } else {
      res.status(400).json({ err: "Invalid credentials" });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "Server error :(" });
  }
});

module.exports = router;
