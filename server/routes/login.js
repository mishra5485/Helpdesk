const { CommonUser } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const verifyGoogleJWT = require("../common/utils");
const jwt_decode = require("jwt-decode");
const verifyGoogleJWT = require("../common/utils");
var crypto = require("crypto");
// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const saltRounds = 10;
const generateAuthToken = require("../common/auth");

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  const user = await CommonUser.findOne({ email: email });
  if (!user) return res.status(403).send("Invalid email or password");

  bcrypt.compare(password, user.password, function (err, result) {
    if (!result) return res.status(403).send("Invalid email or password");
    else {
      console.log(user);
      const payload = { email, access_level: user.access_level };
      const token = generateAuthToken({ payload });
      res.status(200).header("x-auth-token", token).send({
        user_id: user._id,
        username: user.name,
        token: token,
        ssoLogin: user.ssoLogin,
        access_level: user.access_level,
        department_name: user.department_name,
      });
      console.log(token);
    }
  });
});

router.post("/loginwithgoogle", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.send("Please provide a valid token");
    else {
      let Payload = await jwt_decode(token);
      console.log(Payload);
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

// Handle the form submission and send the password reset email
router.post("/forgot", (req, res) => {
  let email = req.body.email;
  email = email.toLowerCase();
  console.log(email);
  // Generate a random token using crypto library

  crypto.randomBytes(20, (err, buf) => {
    if (err) {
      console.log(err);
      return res.status(400).send("failed1");
    }

    const token = buf.toString("hex");

    // Find the user with the given email address in the database
    CommonUser.findOne({ email }, (err, user) => {
      if (!user) {
        // req.flash("error", "No account with that email address exists.");
        return res.status(400).send("failed2");
      }

      // Save the token and expiration time in the user document
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      // Save the updated user document in the database
      user.save((err) => {
        if (err) {
          console.log(err);
          return res.status(400).send("failed3");
        }

        // Send the password reset email using nodemailer library
        sgMail.setApiKey(process.env.API_KEY);

        const mailOptions = {
          to: user.email,
          from: process.env.SENDGRID_EMAIL,
          subject: "Node.js Password Reset",
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste it into your browser to complete the process:\n\n
            http://localhost:3000/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        sgMail
          .send(mailOptions)
          .then((response) => console.log("Email sent...", response))
          .catch((error) =>
            console.log("Failed to send email", error.response.body)
          );

        res.status(200).send("Email sent");
      });
    });
  });
});

// Handle the password reset form submission
router.post("/reset/:token", auth, async (req, res) => {
  try {
    const password = req.body.new_password;
    if (!password) return res.status(401).send("Password is required");
    // const response = await validateResetPassword(req.body);
    // console.log(response);
    // if (response.error) {
    //   return res.status(400).send(response.errorMessage);
    // }
    // console.log(typeof password);
    CommonUser.findOne(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
      (err, user) => {
        if (!user) {
          return res.send({
            error: "Password reset token is invalid or has expired.",
          });
        }

        // Update the user's password and remove the reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) console.log(err);
          user.password = hash;
          await user.save();
        });

        // Send a confirmation email to the user
        sgMail.setApiKey(process.env.API_KEY);

        const mailOptions = {
          to: user.email,
          from: process.env.SENDGRID_EMAIL,
          subject: "Node.js Password Changed",
          text: `Hello ${user.name},\n\n
      This is a confirmation that the password for your account ${user.email} has been changed.\n`,
        };

        sgMail
          .send(mailOptions)
          .then((response) => console.log("Email sent...", response))
          .catch((error) =>
            console.log("Failed to send email", error.response.body)
          );

        res.status(200).send("Email sent");
      }
    );
  } catch {
    res.status(500).send("Failed to reset password");
  }
});

module.exports = router;
