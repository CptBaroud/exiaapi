const mongo = require('mongoose')
    , Schema = mongo.Schema

const team_schema = new Schema({
    num: Number,
    scribe: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    sectrtaire: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    animateur: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    gestionaire: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const team = mongo.model('team', team_schema)

module.exports = team
