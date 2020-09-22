const mongoose = require("mongoose");
const Joi = require("joi");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);

function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    content: Joi.string().required().min(5).max(500),
  });

  return schema.validate(note);
}

exports.Note = Note;
exports.validate = validateNote;
