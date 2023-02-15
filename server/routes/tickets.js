const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const { Ticket, validate, validateComment } = require("../models/ticket");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
var moment = require("moment");

router.post("/create-ticket", async (req, res) => {
  const response = await validate(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  let lastTicketNumber;
  try {
    const lastTicket = await Ticket.findOne().sort({ ticketNumber: -1 });
    if (lastTicket) {
      lastTicketNumber = lastTicket.ticketNumber;
      lastTicketNumber++;
    }
  } catch (ex) {}

  const _id = uuidv4();
  const { subject, body, user_id, department_name } = req.body;
  let ticket = new Ticket({
    _id,
    subject,
    body,
    user_id,
    department_name,
    ticketNumber: lastTicketNumber,
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

  const { id, content, createdBy, userName } = req.body;
  let createdAt = getTimestamp();
  let ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.send("Can't find ticket id");
  }
  await Ticket.updateOne(
    { _id: id },
    {
      $push: {
        comments: [{ content, createdBy, userName, createdAt }],
      },
    }
  );
  ticket = await Ticket.findById(id);

  res.status(200).send("Success!");
});

const getTimestamp = () => {
  return (unixTimestamp = Math.ceil(moment().valueOf() / 1000));
};

module.exports = router;
