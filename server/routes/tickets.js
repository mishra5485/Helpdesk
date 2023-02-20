const auth = require("../middleware/auth");
const { Ticket } = require("../models/ticket");
const {
  validate,
  validateMessageType,
  validateImageType,
} = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
var moment = require("moment");
const upload = require("../middleware/multer");

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
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = (pageNumber - 1) * limit;
    let tickets = await Ticket.find({}).limit(limit).skip(skippedItems);
    let count = await Ticket.countDocuments({});
    res.send({ tickets: tickets, count: count });
  } catch (ex) {
    res.status(404).send("Unable to fetch tickets");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    res.send(ticket);
  } catch (ex) {
    res.status(404).send("Unable to find ticket");
  }
});

router.get("/all", auth, async (req, res) => {
  let tickets = await Ticket.find({});
  res.send(tickets);
});

router.post("/comment", upload.single("avatar"), async (req, res) => {
  const { type } = req.body;

  if (type === "text") {
    const response = await validateMessageType(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }
    const { id, content, createdBy, userName, type } = req.body;

    userName.toLowerCase();
    createdBy.toLowerCase();
    let createdAt = getTimestamp();
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.send("Can't find ticket id");
    }
    await Ticket.updateOne(
      { _id: id },
      {
        $push: {
          comments: [{ type, content, createdBy, userName, createdAt }],
        },
      }
    );
    ticket = await Ticket.findById(id);

    res.status(200).send("Success!");
  } else if (type === "image") {
    const file = req.file;
    const content = file.filename;
    const response = await validateImageType(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }

    const { id, createdBy, userName, type } = req.body;

    userName.toLowerCase();
    createdBy.toLowerCase();
    let createdAt = getTimestamp();
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.send("Can't find ticket id");
    }
    await Ticket.updateOne(
      { _id: id },
      {
        $push: {
          comments: [{ type, content, createdBy, userName, createdAt }],
        },
      }
    );
    ticket = await Ticket.findById(id);

    res.status(200).send("Success!");
  }
});

const getTimestamp = () => {
  return (unixTimestamp = Math.ceil(moment().valueOf() / 1000));
};

module.exports = router;
