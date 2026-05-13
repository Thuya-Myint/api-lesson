import express from 'express'
import { bookRoutes } from './book.route.js'

export const routes = express.Router()

routes.use("/books", bookRoutes)
