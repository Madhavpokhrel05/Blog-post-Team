const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

sessions.post('/', (req,res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send('Oops the DB had a problem')
        } else if (!foundUser) {
            res.send('<a href="/">Sorry, no user found.</a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser
                console.log("Successful Login");
                res.redirect('/transactions')
            } else {
                res.send('<a href="/">Password does not match</a>')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        console.log("Successful Logout");
        res.redirect('/')
    })
})

module.exports = sessions
