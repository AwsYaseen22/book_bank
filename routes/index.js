const express = require('express')
const router = express.Router()
// protect routes with middle ware 
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// if the user is not logged in show him/her the login page and they cannot go to dashboard without loggin in
router.get('/', ensureGuest, (request, response) => {
    response.render('pages/login.ejs')
})
// if the user logged in show him/her the dashboard instead and they cannot go to login page
router.get('/dashboard', ensureAuth, (request, response) => {
    response.render('pages/dashboard.ejs')
})

module.exports = router