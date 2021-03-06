const mongo = require('mongoose')
    , Schema = mongo.Schema

const users_schema = new Schema({
    name: String,
    surname: String,
    password: String,
    mail: String,
    notYetPicked: Boolean,
    picked: Boolean,
    alreadyPicked: Boolean,
    role: Number,
    theme: Boolean
})

const users = mongo.model('users', users_schema)

module.exports = users
