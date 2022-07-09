const mongoose = require("mongoose")

//Create schema
const Project = mongoose.Schema(
  {
    //Objects
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.models.Project || mongoose.model("Project", Project)
