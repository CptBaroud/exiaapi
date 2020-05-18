var express = require('express');
const login = require("../models/login");
let jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next) {
  login.getAllUser(function (error, rows) {
        if (error) {
          res.json(error);
        } else {
            console.log(rows)
          res.json(rows);
        }
  })
});

router.get('/getUser', function(req, res, next) {
    let data = jwt.decode(req.headers.authorization)
    login.geProfil(data.user,function (error, rows) {
        if (error) {
            res.json(error);
        } else {
            console.log(rows)
            res.json({user: rows});
        }
    })
});

module.exports = router;
