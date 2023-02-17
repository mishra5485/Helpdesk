require("dotenv").config();
const mongoose = require("mongoose");

module.exports = function () {
  const uri = process.env.MONGO_URL;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log(err));

  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  mongoose.connection.on("disconnected", () =>
    console.log("MongoDB disconnected")
  );
};
