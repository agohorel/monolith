const validateRegisterCreds = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ err: "Please provide a username, email, and password" });
  } else {
    next();
  }
};

const validateLoginCreds = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ err: "Please provide a username and password" });
  } else {
    next();
  }
};

module.exports = { validateRegisterCreds, validateLoginCreds };
