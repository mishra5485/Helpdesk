const mongoose = require("mongoose");
const Joi = require("joi");
var moment = require("moment");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10240,
    },
    body: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 102400,
    },
    user_id: {
      type: Number,
      required: true,
    },
    department_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    createdDate: {
      type: String,
      default: moment().format("MMM Do YYYY"),
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

async function validateTicket(ticket) {
  let error = false;
  const schema = Joi.object({
    subject: Joi.string().min(5).max(1024).required(),
    body: Joi.string().min(5).required(),
    user_id: Joi.number().required(),
    department_name: Joi.string().min(2).max(50).required(),
  });

  try {
    const value = await schema.validateAsync(ticket);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

async function validateComment(comment) {
  let error = false;

  const schema = Joi.object({
    id: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(2).required(),
    createdBy: Joi.string().min(2).max(10).required(),
  });

  try {
    const value = await schema.validateAsync(comment);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

exports.Ticket = Ticket;
exports.validate = validateTicket;
exports.validateComment = validateComment;
