import { createBook, getAllBook } from "../services/book.service.js"

export const getAllBookController = async (req, res) => {
  try {
    console.log("reqheader", req.headers)
    const data = await getAllBook()
    res.status(200).json({
      success: true,
      message: `total ${data.length ?? 0} book retrieved!`,
      data: data
    })
  } catch (error) {
    console.error("error getAllBookController()", error)
    res.status(500).json({
      success: false,
      message: "failed to retrieve all book",
      data: null
    })
  }
}

export const createBookController = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        message: "invalid request body",
        success: false,
        data: null
      })
    }
    const book = await createBook(req.body)
    res.status(200).json({
      message: `[${book.title}] is successfully created!`,
      success: true,
      data: book
    })

  } catch (error) {
    console.log("error createBookController() 1", error)
    res.status(500).json({
      message: `${error}`,
      success: false,
      data: null
    })
  }
}