const express = require("express");
const dotenv = require("dotenv");
const { Blog, User } = require("./database/modals");

const app = express();
dotenv.config();

// middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// routes
// register a new user

app.post("/api/users/create", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// GET all users
app.get("/api/users/all", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Blog,
          as: "blogsIcreated",
          attributes: ["title", "content"],
        },
      ],
    });
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// create blog
app.post("/api/blogs/create", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const blog = await Blog.create({
      title,
      content,
      userId,
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get all blogs
app.get("/api/blogs/all", async (req, res) => {
  try {
    // return all blogs where userId is the userId
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: "createBy",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    res.status(200).json({
      message: "All blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get all blogs by userId
app.get("/api/blogs/all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await Blog.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          as: "createBy",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    res.status(200).json({
      message: "All blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
