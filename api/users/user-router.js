const router = require("express").Router();
const restricted = require("../restricted/restricted");
const Users = require("../auth/auth-model");
const bcrypt = require("bcryptjs");
const { checkUserById } = require("./user-middleware");

router.get("/:id", restricted, checkUserById, (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "user in get with id doesnt work" });
    });
});

//auth middleware is checking for username so i just need to verify the password and phone number are submitted as you can see
router.put("/:id", restricted, checkUserById, (req, res, next) => {
  const credentials = req.body;

  if (!credentials.password || !credentials.phone_number) {
    res.status(400).json({
      message: "username, password, and phone number are required to proceed",
    });
  } else {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.updateUser(req.params.id, credentials)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
});

router.use((err, req, res) => {
  res.status(500).json({
    message: "check server inside users",
  });
});

module.exports = router;
