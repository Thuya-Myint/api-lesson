import { Book } from "../models/book.model.js"

export const getAllBook = async () => {
  const allBooks = await Book.find({})
  return allBooks
}

export const createBook = async (payload) => {

  console.log("payload ", payload)
  const foundBook = await Book.findOne({ title: payload.title })


  if (foundBook) {
    console.log("book with same title already exists!")
    throw new Error("book with same title already exists!")
  }
  const createdBook = await Book.create(payload)

  return createdBook

}


