const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require ('bcrypt')
const User = require('../models/users.js')
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI
const app = express()
require('dotenv').config()
const cors = require('cors')
const blogsController = require('./controllers/blogs.js')
const hashedString = bcrypt.hashSync('Teamwork', bcrypt.genSaltSync(10))

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const projectsController = require('./controllers/projects.js')
app.use('/projects', projectsController)

app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}))

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


mongoose.connect('mongodb://localhost:27017/blogs', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

app.use('/blogs', blogsController)

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
