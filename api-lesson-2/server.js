import express, { urlencoded } from 'express'
import cors from 'cors'
import compression from 'compression'
import { config } from './configs/config.js'
import http from 'http'
import { connectMongoDB, disconnectMongoDB } from './db/mongo.js'
import { mongoOptions } from './constants/mongo.js'
import { routes } from './routes/index.js'


const app = express()
const server = http.createServer(app)
const port = config.port
const mongoURL = config.mongoURL

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use(express.json())
app.use(compression())
app.use(urlencoded({ extended: true }))
app.use("/api/v1", routes)
app.disable("X-Powered-By`")


try {
  await connectMongoDB(mongoURL, mongoOptions)
  server.listen(port, () => {
    console.log(`server is listening on port:${port}`)
  })
} catch (error) {
  console.error("failed to start server", error)
  await disconnectMongoDB()
  process.exit(1)
}



const gracefulShutdown = (signal) => {
  console.log(`${signal} received!`)

  server.close(async () => {
    await disconnectMongoDB()
    console.log("server shutdown")
    process.exit(0)
  })

  setTimeout(async () => {
    await disconnectMongoDB()
    console.log("server failed close and force shutting down")
    process.exit(1)
  }, 10000)
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"))
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))





