import express, { urlencoded } from 'express'
import cors from 'cors'
import compression from 'compression'

const app = express()

app.use(cors({
  origin: "http://localhost:3000/",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))
app.use(express.json())
app.use(compression())
app.use(urlencoded({ extended: true }))



