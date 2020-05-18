const multer = require('multer')
var express = require('express');
var router = express.Router();

const uplaod = multer({
    dest: '/'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', uplaod.single('file'), function(req, res, next) {
    console.log(req.file)
    res.json({file: req.file});
});

module.exports = router;
