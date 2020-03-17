const project = require('express').Router()
const Project = require('../models/project.js')

// I.N.D.U.C.E.S. //
// Index Route //
project.get('/', (req, res) => {
  Project.find({}, (err, foundProject) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundProject)
  })
})

// New Route //


// Delete Route //
project.delete('/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, deletedProject) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedProject)
  })
})

// Update Route //
project.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProject) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedProject)
  })
})

// Create Route //
project.post('/', (req, res)=> {
    Project.create(req.body, (error, createdProject)=>{
        if(error){
            res.status(400).json({error: error.message})
        }
        res.status(200).send(createdProject)
    })
})

// Edit Route //

// Show Route //

module.exports = project
