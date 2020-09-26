const express = require("express");
const router = express.Router();
const { Todo, validate } = require("../models/todo");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id }).sort("-created");
  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = Todo({
    text: req.body.text,
    userId: req.user._id,
  });

  await todo.save();
  res.send(todo);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    { new: true }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");
  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo)
    return res.status(404).send("The todo with given ID was not found.");
  res.send(todo);
});

router.get("/:id", async (req, res) => {
  const todo = Todo.findById(req.params.id);
  if (!todo) res.status(404).send("The todo with the given ID was not found");
});

module.exports = router;
