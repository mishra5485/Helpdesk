const mongoose = require("mongoose");
const Joi = require("joi");

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
    department_id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

function validateTicket(user) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(user, schema);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;
