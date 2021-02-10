const team = require('../models/team')
const user = require('../models/users')

let teamController = {

    get(req, res) {
        team
            .find()
            .populate('scribe secretaire animateur gestionnaire')
            .exec(function (err, doc) {
                if (!err) {
                    res.status(200).send(doc)
                } else {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: err,
                        stack: err.stack
                    })
                }
            })
    },

    /**
     * Créer les equipes
     * On doit assigner au
     * @param req
     * @param res
     */
    async create(req, res) {
        // On load tout les users de la table
        const users = await user.find().exec()

        //Il doit y avoir autant d'equipes qu'il y'a d'utilisateurs
        //Pour que chacun puisse avoir au moins une fois chaque roles
        const teams = []

        for (let a = 0; a <= users.length; a++){
        }

    }
}

module.exports = teamController

function randomInt(size) {
    if (size > 0) {
        return Math.floor(Math.random() * size)
    }
    return null
}
