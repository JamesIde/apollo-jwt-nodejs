const User = require("../models/user")
const bcrypt = require("bcryptjs")
const resolvers = {
  Query: {
    async getUsers(args, context, info) {
      return await User.find({})
    },
  },
  Mutation: {
    async registerUser(args, context, info) {
      // Check user already exists
      const user = await User.findOne({ email: args.email })
      if (user) {
        throw new Error("User already exists")
      }
      // bcrypt
      if (args.password !== args.password2) {
        throw new Error("Passwords do not match")
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(args.password, salt)
      // Create user
      const newUser = new User({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        token: "123",
      })

      const result = await newUser.save()
      return result
    },
  },
}

module.exports = resolvers
