require("dotenv").config();
require("./startup/db")();

const express = require("express");
const app = express();
var cors = require("cors");
const tickets = require("./routes/tickets");
const users = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/tickets", tickets);
app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
