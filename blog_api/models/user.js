const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      unique: true,
      required: true
    },

    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    }]
})

module.exports = mongoose.model('User', userSchema)
