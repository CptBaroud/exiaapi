let db = require('../dbconnection');

let kivaferkoi = {
    getAlreadyPicked: function (callback) {
        return db.query('SELECT users.id, users.name, users.username, users.avatar FROM alreadypicked INNER JOIN users ON users.id = alreadypicked.id_user' ,callback)
    },
    getNotYetPicked: function (callback) {
        return db.query('SELECT users.id, users.name, users.username, users.avatar FROM notyetpicked INNER JOIN users ON users.id = notyetpicked.id_user', callback)
    },
    getPicked: function (callback) {
        return db.query('SELECT users.id, users.name, users.username, users.avatar FROM picked INNER JOIN users ON users.id = notyetpicked.id_user', callback)
    },
    truncateAlreadyPicked: function (callback) {
        return db.query('TRUNCATE TABLE alreadypicked', callback)
    },
    truncateNotYetPicked: function (callback) {
        return db.query('TRUNCATE TABLE notyetpicked', callback)
    },
    truncatePicked: function (callback) {
        return db.query('TRUNCATE TABLE picked', callback)
    },
    addAlreadyPicked: function (data, callback) {
        return db.query('INSERT INTO alreadypicked VALUES (?, ?)', [undefined, data.id_user], callback)
    },
    addNotyetPicked: function (data, callback) {
        return db.query('INSERT INTO notyetpicked VALUES (?, ?)', [undefined, data.id_user], callback)
    },
    addPicked: function (data, callback) {
        return db.query('INSERT INTO picked VALUES (?, ?)', [undefined, data.id_user], callback)
    }
};

module.exports = kivaferkoi;
