const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {type: String},
  entry: {type: String},
},
{timestamps: true}
)

module.exports = mongoose.model('Blog', blogSchema)
