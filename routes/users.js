const express = require('express');
const login = require("../models/login");
let jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET_SIGN = process.env.JWT_SECRET_SIGN;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next) {
  login.getAllUser(function (error, rows) {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json(rows);
        }
  })
});

router.get('/getUser', function(req, res, next) {
    let data = jwt.decode(req.headers.authorization)
    login.geProfil(data.user,function (error, rows) {
        if (error) {
            res.json(error);
        } else {
            res.json({user: rows});
        }
    })
});

router.put('/avatar/:id?', function(req, res) {
    let data = {
       avatar: req.body.avatar,
        id: req.params.id
    };

    jwt.verify(req.headers['token'], JWT_SECRET_SIGN, function (err) {
        if (err) {
            res.json({
                message: 'Le Token est invalide',
                error: err
            })
        } else {
            login.editAvatar(data, function (error, rows) {
                if(error){
                    res.status(500).json({
                        error: error
                    })
                } else {
                    res.status(200).json({
                        message: 'Avatar successfully updated',
                        rows: rows
                    })
                }
            })
        }
    })
});

module.exports = router;
