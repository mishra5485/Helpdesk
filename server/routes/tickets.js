const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const { Ticket, validate, validateComment } = require("../models/ticket");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// var moment = require("moment");

router.post("/create-ticket", auth, async (req, res) => {
  console.log(req.body);
  const response = await validate(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  const { subject, body, user_id, department_name } = req.body;
  let ticket = new Ticket({
    _id,
    subject,
    body,
    user_id,
    department_name,
  });
  await ticket.save();
  res.status(200).send("Ticket created successfully!");
});

router.get("/all/:limit/:pageNumber", auth, async (req, res) => {
  let limit = req.params.limit;
  let pageNumber = req.params.pageNumber;
  let skippedItems = pageNumber * limit;
  let tickets = await Ticket.find({}).limit(limit).skip(skippedItems);
  let count = await Ticket.countDocuments({});
  res.send({ tickets: tickets, count: count });
});

router.get("/:id", auth, async (req, res) => {
  let ticket = await Ticket.findById(req.params.id);
  res.send(ticket);
});

router.get("/all", auth, async (req, res) => {
  let tickets = await Ticket.find({});
  res.send(tickets);
});

router.post("/comment", auth, async (req, res) => {
  const response = await validateComment(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const { id, content, createdBy } = req.body;
  let ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.send("Can't find ticket id");
  }
  await Ticket.updateOne(
    { _id: id },
    {
      $push: {
        comments: [{ content, createdBy }],
      },
    }
  );
  ticket = await Ticket.findById(id);
  // ticket = await Ticket.findById(id);

  res.status(200).send("Success!");
});

module.exports = router;
