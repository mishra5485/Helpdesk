const mongoose = require("mongoose");

module.exports = function () {
  const uri =
    "mongodb+srv://amitsin:Slash123@cluster0.0ivaxjw.mongodb.net/helpdesk?retryWrites=true&w=majority";

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
