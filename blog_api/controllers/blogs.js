const express = require('express')
const blogs = express.Router()
const Blog = require('../models/blogs.js')


//Index
blogs.get('/', (req, res) => {
  Blog.find({}, (err, foundBlogs) => {
    if (err) {
      res.status(400).json({error: err.message})
    }
    res.status(200).json(foundBlogs)
  })
})

//Create
blogs.post('/', async (req, res) => {
  Blog.create(req.body, (error, createdBlog) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    res.status(200).send(createdBlog)
  })
})

//Delete
blogs.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
    if (err) {
      res.status(400).json({error: err.message})
    }
    res.status(200).json(deletedBlog)
  })
})

//Update
blogs.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBlog) => {
    if (err) {
      res.status(400).json({error: err.message})
    }
    res.status(200).json(updatedBlog)
  })
})


module.exports = blogs
