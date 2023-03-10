const Joi = require("joi");

async function validateTicket(ticket) {
  let error = false;
  const schema = Joi.object({
    subject: Joi.string().min(5).max(1024).required(),
    body: Joi.string().min(5).required(),
    user: Joi.object({
      user_id: Joi.string().min(2).max(50).required(),
      user_name: Joi.string().min(2).max(50).required(),
    }).required(),
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

async function validateAssign(body) {
  let error = false;
  const schema = Joi.object({
    assigned: Joi.object({
      user_id: Joi.string().min(2).max(50).required(),
      user_name: Joi.string().min(2).max(50).required(),
    }).required(),
  });

  try {
    const value = await schema.validateAsync(body);
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

async function validateUpdate(comment) {
  let error = false;

  const schema = Joi.object({
    status: Joi.string().required(),
    priority: Joi.string().required(),
    department_name: Joi.string().required(),
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

async function validateForgotPassword(body) {
  let error = false;

  const schema = Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string().required(),
  });

  try {
    const value = await schema.validateAsync(body);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

async function validateResetPassword(body) {
  let error = false;

  const schema = Joi.object({
    new_password: Joi.string().required(),
  });

  try {
    const value = await schema.validateAsync(body);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

async function validatedepartment(body) {
  let error = false;

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    departmentid: Joi.string(),
  });

  try {
    const value = await schema.validateAsync(body);
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
exports.validateUpdate = validateUpdate;
exports.validateForgotPassword = validateForgotPassword;
exports.validateResetPassword = validateResetPassword;
exports.validatedepartment = validatedepartment;
exports.validateAssign = validateAssign;
