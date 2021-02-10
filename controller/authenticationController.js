const jwt = require('../utils/jwt.utils')
const users = require('../models/users')
const bcrypt = require("bcrypt");
let authController = {
    tempToken(req, res) {
        res.send(jwt.generateOneTImeToken())
    },
    /**
     * Deprecated
     * On ne doit pas se register
     * @param req
     * @param res
     */
    /*register(req, res) {
        users.findOne({mail: req.body.mail}, function (err, user) {
            if (err) {
                res.status(500).json(err)
            }
            if (user) {
                res.status(202).json({
                    message: 'Cet adresse mail est déjà liée à un compte'
                })
            } else {
                let data = req.body
                let saltRound = 10;
                bcrypt.genSalt(saltRound, function (err, salt) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            message: 'Une erreur est survenue lors du cryptage du mot de passe, salt',
                            error: err
                        })
                    } else {
                        bcrypt.hash(data.password, salt, function (err, pswd) {
                            if (err) {
                                console.log(err)
                                res.status(500).json({
                                    message: 'Une erreur est survenue lors du cryptage du mot de passe, hash',
                                    error: err
                                })
                            } else {
                                data.password = pswd;
                                const newUser = new users({
                                    username: data.username,
                                    password: data.password,
                                    mail: data.mail,
                                    name: data.name,
                                    surname: data.surname
                                })
                                newUser.save(function (err) {
                                    if (err) {
                                        console.dir(err)
                                        res.status(500).json({
                                            message: 'Une erreur est survenue',
                                            error: err.toString()
                                        })
                                    } else {
                                        res.status(201).json({
                                            message: 'L\'utilisateur à été ajouté avec succès'
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },*/

    login(req, res) {
        users.findOne({mail: req.body.mail.toLowerCase()}, function (err, user) {
            if (err) {
                res.status(500).json({
                    message: "Une erreur serveur est survenue",
                    error: err,
                    stack: err.stack
                })
            } else if (!user) {
                res.status(202).json({
                    message: "Cette adresse mail n'est associée à aucun compte",
                    error: err,
                    stack: err.stack
                })
            } else {
                bcrypt.compare(req.body.password, user.password, function (error, result) {
                    if (error) {
                        res.status(500).json({
                            message: 'Une erreur est survenue',
                            error: error,
                            stack: error.stack
                        })
                    } else {
                        if (result) {
                            res.status(200).json({
                                token: jwtUtils.generatedToken(req.body)
                            })
                        } else {
                            res.status(401).json({
                                message: 'Le mot de passe est incorrect',
                                error: error,
                                stack: error.stack
                            })
                        }
                    }
                })
            }
        }).lean(true)
    }
}

module.exports = authController
