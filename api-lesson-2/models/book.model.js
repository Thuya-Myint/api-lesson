import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    unique: true,
  },
  author: {
    type: String,
    default: "unknown"
  }
}, {
  timestamps: true
})

export const Book = mongoose.model("Book", bookSchema)
