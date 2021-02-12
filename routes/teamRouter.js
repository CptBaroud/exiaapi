const teamController = require('../controller/teamController')
const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
    teamController.create(req, res)
})

module.exports = router
