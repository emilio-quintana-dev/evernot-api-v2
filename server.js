const express = require("express");
const mongoose = require("mongoose");
const app = express();
const notes = require("./routes/notes");
const users = require("./routes/users");
const auth = require("./routes/auth");

mongoose
  .connect("mongodb://localhost/evernot", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Error: ", error));

app.use(express.json());
app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
