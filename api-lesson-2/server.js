import express, { urlencoded } from 'express'
import cors from 'cors'
import compression from 'compression'
import { config } from './configs/config.js'
import http from 'http'


const app = express()
const server = http.createServer(app)
const port = config.port

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
// }))
app.use(express.json())
app.use(compression())
app.use(urlencoded({ extended: true }))

app.get("/", (req, res) => res.status(200).json({
  message: "Hello, world!"
}))



const gracefulShutdown = (signal) => {
  console.log(`${signal} received!`)

  if (signal = "SIGINT") {
    console.log("server shutting down")
    //disconnect mongo, redis
    server.close()
    process.exit(0)
  }

  setTimeout(() => {
    console.log("server failed close and force shutting down")
    process.exit(1)
  }, 10000)
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"))
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))


server.listen(port, () => {
  console.log("server is running on port :", port)
})


