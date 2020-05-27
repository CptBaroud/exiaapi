let db = require('../dbconnection');

let prosit = {
    getKeywords: function (id_prosit, callback) {
        return db.query('SELECT * FROM keywords WHERE keywords.num_prosit = ' + id_prosit ,callback)
    },
    getHyptothesies: function (id_prosit, callback) {
        return db.query('SELECT * FROM hypothesises WHERE hypothesises.num_prosit = ' + id_prosit ,callback)
    },
    getConstraints: function (id_prosit, callback) {
        return db.query('SELECT * FROM constraints WHERE constraints.num_prosit = ' + id_prosit ,callback)
    },
    getPa: function (id_prosit, callback) {
        return db.query('SELECT * FROM pa WHERE pa.num_prosit = ' + id_prosit ,callback)
    },
    getProblematics: function (id_prosit, callback) {
        return db.query('SELECT * FROM problematics WHERE problematics.num_prosit = ' + id_prosit ,callback)
    },
    check: function(numProsit, callback){
        return db.query('SELECT prosit.num_prosit FROM prosit WHERE prosit.num_prosit = ' + numProsit, callback )
    },
    getProsit: function (id, callback) {
        return db.query('SELECT prosit.name, prosit.num_prosit, prosit.context, prosit.generalisation, prosit.id FROM prosit WHERE prosit.num_prosit = ' + id, callback)
    },
    getAllProsit: function (callback) {
        return db.query('SELECT prosit.name, prosit.num_prosit, prosit.context, prosit.generalisation, prosit.id, prosit.scribe FROM prosit', callback)
    },
    addKeyword: function (data, callback) {
        return db.query('INSERT INTO keywords VALUE (?, ?, ?, ?)', [undefined, data.name, data.definition, data.num_prosit], callback)
    },
    addHyptothesies: function (data, callback) {
        return db.query('INSERT INTO hypothesises VALUE (?, ?, ?)', [undefined, data.name, data.num_prosit], callback)
    },
    addConstraints: function (data, callback) {
        return db.query('INSERT INTO constraints VALUE (?, ?, ?)', [undefined, data.name, data.num_prosit], callback)
    },
    addPa: function (data, callback) {
        return db.query('INSERT INTO pa VALUE (?, ?, ?)', [undefined, data.name, data.num_prosit], callback)
    },
    addProblematics: function (data, callback) {
        return db.query('INSERT INTO problematics VALUE (?, ?, ?)', [undefined, data.name, data.num_prosit], callback)
    },
    addProsit: function (data, callback) {
        return db.query('INSERT INTO prosit VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)', [undefined, data.num_prosit, data.name, data.context, data.generalisation, data.scribe, data.animateur, data.secretaire, data.gestionaire], callback)
    },
    getLastId: function  (callback) {
        return db.query('SELECT prosit.id FROM prosit ORDER BY prosit.id DESC', callback)
    },
    getNumProsit: function (callback) {
        return db.query('SELECT role.num_prosit FROM role', callback)
    },
    updateNumprosit: function (data, callback) {
        return db.query('UPDATE role.num_prosit = \'' + data.num_prosit + '\' WHERE role.id = 1', callback)
    }
};

module.exports = prosit;
