const authController = require('../controller/authenticationController')
const express = require('express')

const router = express.Router()

router.get('/getToken', (req, res) => {
    authController.tempToken(req, res)
})

module.exports = router
