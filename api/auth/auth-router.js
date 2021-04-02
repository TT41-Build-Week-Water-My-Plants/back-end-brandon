//Do not forget to export the router, very important

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");
const {
  checkUsernameExists,
  checkUsernameTaken,
} = require("./auth-middleware");
const Auth = require("./auth-model");

//registering user uses this endpoint

router.post("/register", checkUsernameTaken, (req, res, next) => {
  const credentials = req.body;

  if (
    !credentials.username ||
    !credentials.password ||
    !credentials.phone_number
  ) {
    res.status(400).json({
      message:
        "A username, password, and phone number are required to proceed human",
    });
  } else {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Auth.add(credentials)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "username and password are required" });
  } else {
    const { username, password } = req.body;

    Auth.findByUsername(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = buildToken(user);
          res.status(200).json({ message: `welcome, ${user.username}`, token });
        } else {
          res.status(401).json({
            message:
              "Invalid credentials, make sure you have a username and password inputed",
          });
        }
      })
      .catch(next);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const config = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, config);
}

module.exports = router;

//I think this is a simple way to do an register. the used above is more secure however, making sure every field is used or else.

// router.post("/register", checkUsernameTaken, (req, res) => {
//     const credentials = req.body;

//     if (credentials) {
//       const rounds = process.env.BCRYPT_ROUNDS || 8;

//       const hash = bcrypt.hashSync(credentials.password, rounds);

//       credentials.password = hash;

//       Auth.add(credentials)
//         .then((user) => {
//           res.status(201).json(user);
//         })
//         .catch((err) => {
//           res.status(500).json({ message: err.message, stack: err.stack });
//         });
//     } else {
//       res.status(400).json({ message: "username and password required" });
//     }
//   });
