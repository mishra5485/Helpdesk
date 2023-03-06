const { CommonUser } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const verifyGoogleJWT = require("../common/utils");
const jwt_decode = require("jwt-decode");

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
        ssoLogin: user.ssoLogin,
        access_level: user.access_level,
        department_name: user.department_name,
      });
    }
  });
});

router.post("/loginwithgoogle", async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token)
    if (!token) return res.send("Please provide a valid token");
    else {
      let Payload= await jwt_decode(token);
      console.log(Payload)
      const user = await CommonUser.findOne({ email: Payload.email });
      
      if (!user) {
        return res
        .status(403)
        .send("User not registered. Please sign-up with Google first");
      } else {
        let email = Payload.email;
        const token = generateAuthToken({ email });
        res.status(200).header("x-auth-token", token).send({
          user_id: user._id,
          username: user.name,
          picture: user.picture,
          ssoLogin: user.ssoLogin,
          token: token,
          access_level: user.access_level,
          department_name: user.department_name,
        });
      }
    }
  } catch (err) {
    res.status(403).json("Forbidden. Failed to login");
  }
});

module.exports = router;
