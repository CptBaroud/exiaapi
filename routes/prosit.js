const express = require('express');
const router = express.Router();
const prosit = require('../models/prosits')

let num = 0
let errorCount = 0
let errorsArray = []
/* GET home page. */
router.get('/:num_prosit?', function (req, res, next) {
    prosit.getProsit(req.params.num_prosit, function (error, rows) {
        if (error) {
            res.json({
                status: 'Error',
                message: error
            })
        } else {
            if(rows.length > 0) {
                num = rows[0].id
                prosit.getKeywords(num, function (error, keywords) {
                    if (error) {
                        res.json({
                            status: 'Error',
                            message: error
                        })
                    } else {
                        prosit.getConstraints(num, function (error, constraint) {
                            if (error) {
                                res.json({
                                    status: 'Error',
                                    message: error
                                })
                            } else {
                                prosit.getProblematics(num, function (error, problematics) {
                                    if (error) {
                                        res.json({
                                            status: 'Error',
                                            message: error
                                        })
                                    } else {
                                        prosit.getHyptothesies(num, function (error, hyptothesies) {
                                            if (error) {
                                                res.json({
                                                    status: 'Error',
                                                    message: error
                                                })
                                            } else {
                                                prosit.getPa(num, function (error, pa) {
                                                    if (error) {
                                                        res.json({
                                                            status: 'Error',
                                                            message: error
                                                        })
                                                    } else {
                                                        res.json({
                                                            name: rows[0].name,
                                                            context: rows[0].context,
                                                            generalisation: rows[0].generalisation,
                                                            keywords: keywords,
                                                            constraints: constraint,
                                                            problematics: problematics,
                                                            hyptothesies: hyptothesies,
                                                            pa: pa
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
});

router.get('/check/:num_prosit?', function (req, res, next) {
    const temp = req.params.num_prosit
    prosit.check(temp, function (error, rows) {
        if (error){
            res.json({
                status: "Erreur",
                state: false,
                message: error
            })
        } else {
            if(rows.length !== 0) {
                if(rows[0].num_prosit === parseInt(temp)){
                    res.json({
                        status: "Succes",
                        state: true,
                    })
                } else {
                    res.json({
                        status: "Succes",
                        state: false,
                    })
                }
            } else {
                res.json({
                    status: "Success",
                    state: false,
                })
            }
        }
    })
})

router.post('/', function (req, res, next) {
    let data = {
        name: req.body.name,
        num_prosit: req.body.numProsit,
        context: req.body.context,
        generalisation: req.body.generalisation
    }
    prosit.addProsit(data, function (errors, pr) {
        if (errors) {
            res.json({
                status: "Erreur",
                message: errors
            })
        } else {
            prosit.getLastId(function (error, result) {
                if (error) {
                    res.json({
                        status: "Erreur",
                        message: error
                    })
                } else {
                    let id = result[0].id
                    req.body.keywords.forEach(function (item) {
                        prosit.addKeyword({
                            name: item.name,
                            definition: item.definition,
                            num_prosit: id
                        }, function (error, rows) {
                            if (error) {
                                errorCount++
                                errorsArray.push(error)
                            }
                        })
                    })
                    req.body.pa.forEach(function (item) {
                        prosit.addPa({
                            name: item.name,
                            num_prosit: id
                        }, function (error, rows) {
                            if (error) {
                                errorCount++
                                errorsArray.push(error)
                            }
                        })
                    })
                    req.body.problematics.forEach(function (item) {
                        prosit.addProblematics({
                            name: item.name,
                            num_prosit: id
                        }, function (error, rows) {
                            if (error) {
                                errorCount++
                                errorsArray.push(error)
                            }
                        })
                    })
                    req.body.constraints.forEach(function (item) {
                        prosit.addConstraints({
                            name: item.name,
                            num_prosit: id
                        }, function (error, rows) {
                            if (error) {
                                errorCount++
                                errorsArray.push(error)
                            }
                        })
                    })
                    req.body.hypothesises.forEach(function (item) {
                        prosit.addHyptothesies({
                            name: item.name,
                            num_prosit: id
                        }, function (error, rows) {
                            if (error) {
                                errorCount++
                                errorsArray.push(error)
                            }
                        })
                    })
                }
            })
        }

        if (errorCount > 1){
            res.json({
                status: "Error",
                data: errorsArray
            })
        } else {
            res.json({
                status: "Success"
            })
        }
    })
})

module.exports = router;
