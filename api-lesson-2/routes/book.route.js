import express from 'express'
import { createBookController, getAllBookController } from '../controllers/book.controller.js'

export const bookRoutes = express.Router()

bookRoutes.get("/", getAllBookController)
bookRoutes.post("/", createBookController)

