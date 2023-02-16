const Joi = require("joi");

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

async function validateMessageType(comment) {
  let error = false;

  const schema = Joi.object({
    id: Joi.string().min(2).max(100).required(),
    type: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(2).required(),
    createdBy: Joi.string().min(2).max(10).required(),
    userName: Joi.string().min(2).max(20).required(),
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

async function validateMessageType(comment) {
  let error = false;

  const schema = Joi.object({
    id: Joi.string().min(2).max(100).required(),
    type: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(2).required(),
    createdBy: Joi.string().min(2).max(10).required(),
    userName: Joi.string().min(2).max(20).required(),
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

async function validateImageType(comment) {
  let error = false;

  const schema = Joi.object({
    id: Joi.string().min(2).max(100).required(),
    type: Joi.string().min(2).max(100).required(),
    createdBy: Joi.string().min(2).max(10).required(),
    userName: Joi.string().min(2).max(20).required(),
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

exports.validate = validateTicket;
exports.validateMessageType = validateMessageType;
exports.validateImageType = validateImageType;