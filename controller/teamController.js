const teamModel = require('../models/team')
const userModel = require('../models/users')

let teamController = {

    get(req, res) {
        teamModel
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
        const users = await userModel.find().exec()

        //Il doit y avoir autant d'equipes qu'il y'a d'utilisateurs
        //Pour que chacun puisse avoir au moins une fois chaque roles
        const teams = []

        for (let a = 0; a <= users.length; a++){
            // On initialise l'objet
            let team = { animateur: '', secretaire: '', gestionaire: '', scribe: ''}
            let mark = 0
            //On tire au hasard un utilisateur
            let user = users[randomInt(users.length)]

            if (!checkRole(user._id, 'animateur', teams)) {
                team.animateur = user.name
            }
            teams.push(team)
        }

        res.send(teams)
    }
}

module.exports = teamController

function randomInt(size) {
    if (size > 0) {
        return Math.floor(Math.random() * size)
    }
    return null
}

/**
 * Determine si un utilsateur a déjà un role attribué
 * @param user
 * @param role
 * @param teamArray
 * @returns {*}
 */
function checkRole (user, role, teamArray) {
    return teamArray.includes(item => item[role] === user)
}
