const { CommonUser } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  const user = await CommonUser.findOne({ email: email });
  if (!user) return res.status(403).send("Invalid email or password");

  bcrypt.compare(password, user.password, function (err, result) {
    if (!result) return res.status(403).send("Invalid email or password");
    else {
      const token = generateAuthToken({ email });
      res.status(200).header("x-auth-token", token).send({
        user_id: user._id,
        username: user.name,
        token: token,
        access_level: user.access_level,
      });
    }
  });
});

module.exports = router;
