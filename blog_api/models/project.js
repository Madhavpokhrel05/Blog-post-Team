const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    url: {
      type: String
    },

    languages: [{
      Type: String
    }]
},
{
timestamp: true
}
)

module.exports = mongoose.model('Project', projectSchema)
