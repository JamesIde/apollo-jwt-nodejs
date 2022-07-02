const mongoose = require("mongoose")

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL)

  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline)
}

module.exports = connectDb
