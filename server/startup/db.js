const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1:27017/helpdesk")
    .then(() => console.log("Connected!"));
};
