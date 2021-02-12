const userController = require('../controller/userController')
const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
    userController.add(req, res)
})

module.exports = router
