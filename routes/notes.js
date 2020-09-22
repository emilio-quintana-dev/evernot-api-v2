const express = require("express");
const router = express.Router();
const { Note, validate } = require("../models/note");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  console.log(req.user);
  const notes = await Note.find({ userId: req.user._id }).sort("title");
  res.send(notes);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.user._id,
  });

  await note.save();
  res.send(note);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");
  res.send(note);
});

router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note)
    return res.status(404).send("The note with given ID was not found.");
  res.send(note);
});

router.get("/:id", async (req, res) => {
  const note = Note.findById(req.params.id);
  if (!note) res.status(404).send("The note with the given ID was not found");
});

module.exports = router;
