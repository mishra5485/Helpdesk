const auth = require("../middleware/auth");
const { Ticket } = require("../models/ticket");
const {
  validate,
  validateMessageType,
  validateImageType,
  validateUpdate,
  validateAssign,
} = require("../middleware/validator");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const upload = require("../middleware/multer");
const getTimestamp = require("../common/utils");

router.post("/create-ticket", auth, async (req, res) => {
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
  const { subject, body, user, department_name } = req.body;
  let ticket = new Ticket({
    _id,
    subject,
    body,
    user,
    department_name,
    ticketNumber: lastTicketNumber,
  });
  await ticket.save();
  res.status(200).send("Ticket created successfully!");
});

router.post("all/mytickets/:limit/:pageNumber", auth, async (req, res) => {
  try {
    console.log(req.body);
    let { limit, pageNumber } = req.params;
    let skippedItems = pageNumber * limit;
    const countResult = await Ticket.find(req.body);
    const result = await Ticket.find(req.body).limit(limit).skip(skippedItems);
    let count = countResult.length;
    res.status(200).send({ ticket: result, count });
  } catch (ex) {
    res.status(500).send("Failed to search");
  }
});

router.get("/all/:limit/:pageNumber", auth, async (req, res) => {
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    let tickets = await Ticket.find({}).limit(limit).skip(skippedItems).sort({
      ticketNumber: -1,
    });

    let count = await Ticket.countDocuments({});
    res.status(200).send({ tickets: tickets, count: count });
  } catch (ex) {
    res.status(404).send("Unable to fetch tickets");
  }
});

router.get("/all/:id/:limit/:pageNumber", auth, async (req, res) => {
  try {
    let { id, limit, pageNumber } = req.params;
    let skippedItems = pageNumber * limit;
    const countResult = await Ticket.find({
      "user.user_id": id,
    });
    let tickets = await Ticket.find({
      "user.user_id": id,
    })
      .limit(limit)
      .skip(skippedItems)
      .sort({
        ticketNumber: -1,
      });

    let count = countResult.length;
    res.status(200).send({ tickets: tickets, count: count });
  } catch (ex) {
    res.status(404).send("Unable to fetch tickets");
  }
});

router.get("/employee/all/:id/:limit/:pageNumber", auth, async (req, res) => {
  try {
    let { id, limit, pageNumber } = req.params;
    let skippedItems = pageNumber * limit;
    let ticketsCount = await Ticket.find({
      "assigned.user_id": id,
    });
    let tickets = await Ticket.find({
      "assigned.user_id": id,
    })
      .limit(limit)
      .skip(skippedItems)
      .sort({
        ticketNumber: -1,
      });

    let count = ticketsCount.length;
    res.status(200).send({ tickets: tickets, count: count });
  } catch (ex) {
    res.status(404).send("Unable to fetch tickets");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    res.status(200).send(ticket);
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

router.post("/search/:limit/:pageNumber", auth, async (req, res) => {
  try {
    const { status, department_name, keyword, id } = req.body;
    const filter = {};
    if (status) filter.status = status;
    if (department_name) filter.department_name = department_name;

    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    const regexp = new RegExp(keyword, "i");
    if (id) {
      const countResult = await Ticket.find({
        "user.user_id": id,
        $and: [filter],
        $or: [{ ticketNumber: regexp }, { subject: regexp }],
      });
      console.log(countResult);
      const result = await Ticket.find({
        "user.user_id": id,
        $and: [filter],
        $or: [{ ticketNumber: regexp }, { subject: regexp }],
      })
        .limit(limit)
        .skip(skippedItems);
      let count = countResult.length;
      res.status(200).send({ ticket: result, count });
    } else {
      const countResult = await Ticket.find({
        // "user.user_id": id,
        $and: [filter],
        $or: [{ ticketNumber: regexp }, { subject: regexp }],
      });
      console.log(countResult);
      const result = await Ticket.find({
        // "user.user_id": id,
        $and: [filter],
        $or: [{ ticketNumber: regexp }, { subject: regexp }],
      })
        .limit(limit)
        .skip(skippedItems);
      let count = countResult.length;
      res.status(200).send({ ticket: result, count });
    }
    // let count = countResult.length;
    // res.status(200).send({ ticket: result, count });
  } catch (ex) {
    res.status(500).send("Failed to search");
  }
});

router.post("/department/:limit/:pageNumber", auth, async (req, res) => {
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    const countResult = await Ticket.find(req.body);
    const result = await Ticket.find(req.body)
      .limit(limit)
      .skip(skippedItems)
      .skip(skippedItems)
      .sort({
        ticketNumber: -1,
      });
    let count = countResult.length;
    res.status(200).send({ ticket: result, count });
  } catch (ex) {
    res.status(500).send("Failed to search");
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await validateUpdate(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }

    const filter = { _id: id };
    let emp = await Ticket.findOneAndUpdate(filter, req.body);
    if (!emp) {
      res.status(500).send("Failed to update ticket details");
    } else {
      res.status(200).send("Ticket details updated sucessfully");
    }
  } catch (ex) {
    res.status(500).send("Failed to update ticket details error");
  }
});

router.post("/claim/:id", auth, async (req, res) => {
  console.log("fxghjuytcgh");
  try {
    const response = await validateAssign(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }

    const { assigned } = req.body;
    const { id } = req.params;
    const filter = { _id: id };
    const update = { assigned };
    console.log(update);
    let ticket = await Ticket.findOneAndUpdate(filter, update);
    ticket = await Ticket.find(filter);
    res.status(200).send(ticket);
  } catch {
    res.status(500).send("unable to assign ticket");
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await validateUpdate(req.body);
    if (response.error) {
      return res.status(400).send(response.errorMessage);
    }
    const filter = id;
    let emp = await Ticket.findByIdAndUpdate(filter, req.body);

    if (!emp) {
      res.status(500).send("Failed to update employee details");
    } else {
      res.status(200).send("Employee details updated sucessfully");
    }
  } catch (ex) {
    res.status(500).send("Failed to update employee details error");
  }
});

module.exports = router;
