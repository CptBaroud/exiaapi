const express = require('express');
const router = express.Router();
const kivaferkoi = require('../models/kivaferkoi')

let errorOut = []
let rowsOut = []
let errotCount

/* GET alreadyPicked */
router.get('/alreadyPicked', function (req, res) {
    kivaferkoi.getAlreadyPicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* DELETE alreadyPicked */
router.delete('/alreadyPicked', function (req, res) {
    kivaferkoi.truncateAlreadyPicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* POST alreadyPicked */
router.post('/alreadyPicked', function (req, res) {
    console.log(req.body)
    req.body.alreadyPicked.forEach(function (item) {
        kivaferkoi.addAlreadyPicked(item, function (error, rows) {
            if (error) {
                errotCount++
                errorOut.push(error)
            } else {
                rowsOut.push(rows)
            }
        })
    })

    if (errotCount > 0) {
        res.json({
            status: "Erreur",
            message: errorOut
        })
    } else {
        res.json({
            status: "Success",
            message: rowsOut
        })
    }
});

/* --- Fin AlreadyPicked --- */


/* GET notYetPicked */
router.get('/notYetPicked', function (req, res) {
    kivaferkoi.getNotYetPicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* DELETE notYetPicked */
router.delete('/notYetPicked', function (req, res) {
    kivaferkoi.truncateNotYetPicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* POST notYetPicked */
router.post('/notYetPicked', function (req, res) {
    console.log(req.body)
    req.body.notYetPicked.forEach(function (item) {
        kivaferkoi.addNotyetPicked(item, function (error, rows) {
            if (error) {
                errotCount++
                errorOut.push(error)
            } else {
                rowsOut.push(rows)
            }
        })
    })

    if (errotCount > 0) {
        res.json({
            status: "Erreur",
            message: errorOut
        })
    } else {
        res.json({
            status: "Success",
            message: rowsOut
        })
    }
});

/* --- Fin NotYetPicked --- */


/* GET picked */
router.get('/picked', function (req, res) {
    kivaferkoi.getPicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* DELETE picked */
router.delete('/picked', function (req, res) {
    kivaferkoi.truncatePicked(function (error, rows) {
        if (error) {
            res.json({
                status: "Erreur",
                message: error
            })
        } else {
            res.json(rows)
        }
    })
});

/* POST picked */
router.post('/picked', function (req, res) {
    console.log(req.body)
    req.body.picked.forEach(function (item) {
        kivaferkoi.addPicked(item, function (error, rows) {
            if (error) {
                errotCount++
                errorOut.push(error)
            } else {
                rowsOut.push(rows)
            }
        })
    })

    if (errotCount > 0) {
        res.json({
            status: "Erreur",
            message: errorOut
        })
    } else {
        res.json({
            status: "Success",
            message: rowsOut
        })
    }
});

/* --- Fin Picked --- */


module.exports = router;
