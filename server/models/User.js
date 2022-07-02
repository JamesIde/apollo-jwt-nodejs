const mongoose = require("mongoose")

//Create schema
const UserSchema = new mongoose.Schema({
  //Objects
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
})

module.exports = mongoose.model("User", UserSchema)
