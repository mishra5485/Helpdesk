const mongoose = require("mongoose");
const { CommonUser, validateEmployee } = require("../models/commonUser");
const {
  validateForgotPassword,
  validateResetPassword,
} = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../common/utils");
const getTimestamp = require("../common/utils");
var crypto = require("crypto");
// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

router.post("/register", async (req, res) => {
  const response = await validateEmployee(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, email, password, department_name } = req.body;
  email = email.toLowerCase();

  let employee = await CommonUser.findOne({ email: email, status: 1 });
  if (employee) {
    return res.send("Employee already registered. Please login in!");
  } else {
    let lastEmployeeNumber;
    try {
      const lastEmployee = await CommonUser.findOne({
        access_level: "employee",
      }).sort({ employeeNumber: -1 });
      if (lastEmployee) {
        lastEmployeeNumber = lastEmployee.employeeNumber;
        lastEmployeeNumber++;
      } else {
        lastEmployeeNumber = 100;
      }
    } catch (ex) {}

    let createdAt = getTimestamp();
    employee = new CommonUser({
      _id,
      name,
      password,
      department_name,
      email,
      employeeNumber: lastEmployeeNumber,
      createdAt,
      access_level: "employee",
    });
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) console.log(err);
      employee.password = hash;
      await employee.save();
    });

    const token = generateAuthToken({ email });
    res.status(200).header("x-auth-token", token).send(email.toLowerCase());
  }
});

router.get("/:id", async (req, res) => {
  try {
    let employee = await CommonUser.findById(req.params.id);
    if (employee.access_level === "employee") {
      const {
        _id,
        name,
        department_name,
        email,
        employeeNumber,
        access_level,
        createdAt,
        status,
      } = employee;
      delete employee.password;
      res.status(200).send({
        _id,
        name,
        department_name,
        email,
        employeeNumber,
        access_level,
        createdAt,
        status,
      });
    }
  } catch (ex) {
    res
      .status(404)
      .send("Employee not found. Please provide a valid employee id");
  }
});

router.get("/emp/all/:limit/:pageNumber", async (req, res) => {
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    let employees = await CommonUser.find({
      access_level: "employee",
      status: 1,
    })
      .limit(limit)
      .skip(skippedItems);
    let count = await CommonUser.countDocuments({
      access_level: "employee",
      status: 1,
    });
    res.status(200).send({ employees, count });
  } catch (ex) {
    res.status(404).send("Unable to fetch employees");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await CommonUser.find({
      _id: id,
      access_level: "employee",
      status: 1,
    });
    if (!employee || employee.length === 0) {
      res.status(500).send("Failed to delete employee");
    } else {
      CommonUser.findByIdAndUpdate(id, { status: 0 }, function (err, docs) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send("Delete employee successfully");
        }
      });
    }
  } catch (ex) {
    res.status(500).send("Failed to delete employee");
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id, access_level: "employee", status: 1 };
    let emp = await CommonUser.findOneAndUpdate(filter, req.body);
    if (!emp) {
      res.status(500).send("Failed to update employee details");
    } else {
      res.status(200).send("Employee details updated sucessfully");
    }
  } catch (ex) {
    res.status(500).send("Failed to update employee details");
  }
});

router.post("/search/:limit/:pageNumber", async (req, res) => {
  try {
    let { keyword } = req.body;
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    const regexp = new RegExp(keyword, "i");
    const countResult = await CommonUser.find({
      $and: [
        { $or: [{ employeeNumber: regexp }, { name: regexp }] },
        { access_level: "employee" },
        { status: 1 },
      ],
    });
    const result = await CommonUser.find({
      $and: [
        { $or: [{ employeeNumber: regexp }, { name: regexp }] },
        { access_level: "employee" },
        { status: 1 },
      ],
    })
      .limit(limit)
      .skip(skippedItems);
    let count = countResult.length;
    res.status(200).send({ employees: result, count });
  } catch (ex) {
    res.status(500).send("Failed to search");
  }
});

router.post("/reset/password/:id", async (req, res) => {
  try {
    const response = await validateForgotPassword(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }

    const { id } = req.params;
    const { current_password, new_password } = req.body;
    const user = await CommonUser.findById(id);
    if (!user) return res.status(403).send("Unable to fetch employee details");

    bcrypt.compare(current_password, user.password, function (err, result) {
      if (!result) return res.status(403).send("Invalid password");
      else {
        bcrypt.hash(new_password, saltRounds, async function (err, hash) {
          if (err) return res.send(err);
          const filter = { _id: id };
          const update = { password: hash };
          let u = await CommonUser.findById(id);
          let doc = await CommonUser.findOneAndUpdate(filter, update, {
            new: true,
          });
          res.status(200).send({ "Updated password successfully": doc });
        });
      }
    });
  } catch {
    res.status(500).send("Failed to update password");
  }
});

router.get("/employee/profile/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await CommonUser.findById(id);
    res.send(employee);
  } catch {
    res.send("Unable to fetch details");
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
            http://localhost:3000/employee/reset/${token}\n\n
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
router.post("/reset/:token", async (req, res) => {
  try {
    const password = req.body.new_password;
    const response = await validateResetPassword(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }

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
