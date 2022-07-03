const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const resolvers = {
  Query: {
    async getUsers(args, context, info) {
      return await User.find({})
    },
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      // Check user already exists
      const user = await User.findOne({ email: args.email })
      if (user) {
        throw new Error("User already exists")
      }
      // bcrypt
      if (args.password !== args.password2) {
        throw new Error("Passwords do not match")
      }

      const hashedPassword = bcrypt.hashSync(args.password, 12)

      // Create user
      const createUser = await User.create({
        name: args.name,
        email: args.email,
        password: hashedPassword,
      })

      const result = await createUser.save()

      if (result) {
        return {
          success: true,
          message: "User created successfully",
          token: generateToken(createUser._id),
        }
      }
    },
  },
  Mutation: {
    async loginUser(parent, args, context, info) {
      const user = await User.findOne({ email: args.email })
      if (!user) {
        throw new Error("User does not exist")
      }
      const isMatch = await bcrypt.compare(args.password, user.password)
      if (!isMatch) {
        throw new Error("Password is incorrect")
      }
      return {
        success: true,
        message: "User logged in successfully",
        token: generateToken(user._id),
      }
    },
  },
}

//Generate the token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  })
}

module.exports = resolvers
