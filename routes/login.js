let express = require('express');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let jwtUtils = require('../utils/jwt.utils');
let login = require('../models/login.js');

let router = express.Router();

const JWT_SECRET_SIGN = process.env.JWT_SECRET_SIGN;
const saltRound = 10;

router.post('/getToken', function (req, res) {
    res.send(jwtUtils.generatedToken());
});

router.post('/register', function (req, res, next) {
    let data = req.body;
    bcrypt.genSalt(saltRound, function (err, salt) {
        if (err) {
            res.json({
                message: 'Une erreur est survenue lors du cryptage du mot de passe, salt',
                error: err
            })
        } else {
            bcrypt.hash(data.password, salt, function (err, pswd) {
                if (err) {
                    res.json({
                        message: 'Une erreur est survenue lors du cryptage du mot de passe, hash',
                        error: err
                    })
                } else {
                    data.password = pswd;
                    login.addUser(data, function (error, rows) {
                        if (error) {
                            res.json({
                                message: 'La requete n\'a pas aboutie',
                                error: error
                            });
                        } else {
                            res.json(rows)
                        }
                    })
                }
            })
        }
    })
});

router.post('/', function (req, res, next) {
    console.log('Start login')
    console.log(req.body)
    login.getUser(req.body, function (error, rows) {
        /* jwt.verify(req.headers['token'], JWT_SECRET_SIGN, function (err) {
             if (err) {
                 res.json({
                     message: 'Le Token est invalide',
                     error: err
                 });
             } else {*/
        if (error) {
            res.json({
                message: 'La requete n\'a pas aboutie',
                error: error
            });
        } else {
            bcrypt.compare(req.body.password, rows[0].password, function (err, result) {
                if (err) {
                    res.json({
                        status: 'error',
                        message: 'Le mot de passe est incorrect',
                        error: err
                    })
                } else {
                    //res.json(result)
                    res.json({
                        status: 'success',
                        token: jwtUtils.generatedToken(req.body.username)
                    })
                }
            })
        }
        //}
        //});
    });
});

/**
 * Route pour récupéré tout les deviseurs
 */
router.get('/all', function (req, res) {
    login.getAllUser(function (error, rows) {
        jwt.verify(req.headers['token'], JWT_SECRET_SIGN, function (err) {
            if (err) {
                res.json(err);
            } else {
                if (error) {
                    res.json(error);
                } else {
                    res.json(rows);
                }
            }
        });
    })
});

module.exports = router;
