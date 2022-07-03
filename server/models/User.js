const mongoose = require("mongoose")

//Create schema
const User = new mongoose.Schema(
  {
    //Objects
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.models.User || mongoose.model("User", User)
