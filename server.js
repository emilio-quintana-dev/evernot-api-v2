const express = require("express");
const mongoose = require("mongoose");
const app = express();
const todos = require("./routes/todos");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cors = require("cors");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/evernot", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Error: ", error));

app.use(cors());
app.use(express.json());
app.use("/api/v1/todos", todos);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
