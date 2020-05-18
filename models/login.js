let db = require('../dbconnection');

let login = {
    getAllUser: function (callback) {
        return db.query('SELECT * FROM users', callback)
    },
    getUser: function (data, callback) {
        return db.query(`SELECT users.username, users.password FROM exiacrm.users WHERE users.username = '${data.username}'`, callback)
    },
    geProfil: function (username, callback) {
        return db.query(`SELECT * FROM exiacrm.users WHERE username = '${username}\'`, callback)
    },
    addUser: function (data, callback) {
        return db.query('INSERT INTO exiacrm.users VALUES (?, ?, ?, ?, ?, ?)', [
            undefined,
            data.username,
            data.name,
            data.avatar,
            data.password,
            0
        ], callback)
    }
};

module.exports = login;
