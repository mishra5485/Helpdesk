require("dotenv").config();
require("./startup/db")();

const express = require("express");
const app = express();
var cors = require("cors");
const tickets = require("./routes/tickets");
const users = require("./routes/users");
const employees = require("./routes/employees");
const admin = require("./routes/admins");

app.use(express.json());
app.use(cors());
app.use("/tickets", tickets);
app.use("/users", users);
app.use("/employees", employees);
app.use("/admins", admin);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
