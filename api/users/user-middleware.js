const { findById } = require("../auth/auth-model");

const checkUserId = async (req, res, next) => {
  try {
    const user = await findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: `user with id:${req.params.id} does not exist` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUserPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "all fields are required to proceed" });
  } else {
    next();
  }
};
module.exports = { checkUserId, checkUserPayload };
