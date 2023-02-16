const mongoose = require("mongoose");
var moment = require("moment");

const commentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    content: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    userName: {
      type: String,
    },
    createdAt: {
      type: Number,
    },
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: Number,
      unique: true,
      default: 100,
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
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
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

exports.Ticket = Ticket;
