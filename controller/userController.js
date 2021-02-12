const users = require('../models/users')
const bcrypt = require("bcrypt");

let userController = {

    add(req, res) {
        const new_user = new users(req.body)

        new_user
            .save(function (err, doc) {
                if (!err) {
                    res.status(200).send(doc)
                } else {
                    res.status(500).json({
                        message: 'Internale Server Error',
                        error: err,
                        stack: err.stack
                    })
                }
            })
    }
}

module.exports = userController
