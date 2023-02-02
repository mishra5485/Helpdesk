const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const { Ticket, validate } = require("../models/ticket");
const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

router.post("/create-ticket", auth, async (req, res) => {
  const response = await validate(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  const { subject, body, user_id, department_id, department_name } = req.body;

  let ticket = new Ticket({
    _id,
    subject,
    body,
    user_id,
    department_id,
    department_name,
  });
  await ticket.save();
  res.status(200).send("Tickect created successfully!");
});

router.get("/all", auth, async (req, res) => {
  let tickets = await Ticket.find({});
  res.json(tickets);
});

router.get("/:id", auth, async (req, res) => {
  let ticket = await Ticket.findById(req.params.id);
  res.send(ticket);
});

module.exports = router;
