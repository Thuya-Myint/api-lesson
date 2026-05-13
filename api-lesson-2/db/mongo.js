import mongoose from "mongoose"

export const connectMongoDB = async (url, options) => {
  try {
    await mongoose.connect(url, options)
    console.log("mongodb is successfully connected")
  } catch (error) {
    console.log("error connecting mongodb", error)
  }
}

export const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect()
    console.log("mongodb is disconnected")
  } catch (error) {
    console.log("mongdb disconnect error:", error)
  }
}