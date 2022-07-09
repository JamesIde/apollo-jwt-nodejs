const User = require("../models/user")
const Project = require("../models/project")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const resolvers = {
  Query: {
    async getUser(parent, args, context, info) {
      //context.user.id
      const user = User.findById(context.user.id)

      if (!user) {
        throw new Error("User not found")
      } else {
        return user
      }
    },
    async getUsers(parent, args, context, info) {
      const users = await User.find({})
      return users
    },
    async getProjects(parent, args, context, info) {
      return await Project.findById(context.user.id)
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
    async registerUser(parent, args, context, info) {
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
          name: createUser.name,
          email: createUser.email,
          _id: createUser._id,
        }
      }
    },
    async createProject(parent, args, context, info) {
      if (!context.user) {
        throw new Error("You must be logged in to create a project")
      }
      if (!args.name || !args.description) {
        throw new Error("You must provide a name and description")
      }

      const project = await Project.create({
        name: args.name,
        description: args.description,
        User: context.user,
      })

      const result = await project.save()

      if (result) {
        return project
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
