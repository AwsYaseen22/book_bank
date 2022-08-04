const express = require('express')
const router = express.Router()

router.get('/', async (request, response) => {
    try {
        response.render('pages/login.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})
router.get('/dashboard', async (request, response) => {
    try {
        response.render('pages/dashboard.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})
router.get('/login', async (request, response) => {
    try {
        response.render('pages/login.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

module.exports = router