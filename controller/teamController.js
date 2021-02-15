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

        for (let a = 1; a <= users.length; a++) {
            // On initialise l'objet
            let team = {}
            // Utilisateur
            let user

            //Tant que l'equipe n'est pas complète
            // Cad que les 4 postes soient pourvu
            // Donc que le nombre de clées de l'objet
            // Soit de 4
            while (Object.keys(team).length < 2) {
                user = users[randomInt(users.length)]
                if (!checkTeam(user, team)) {
                    console.log('Good')
                    if (!checkRole(user, 'animateur', teams)) {
                        team.animateur = user
                    } else if (!checkRole(user, 'gestionaire', teams)) {
                        team.gestionaire = user
                    }
                }
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
function checkRole(user, role, teamArray) {
    return teamArray.filter((item) => {
        if (item[role]) {
            return item[role]._id === user._id
        }
        return false
    }).length > 0
}

/**
 * On verifie que l'utilisateur n'est pas déjà présent dans l'equipe
 * @param user
 * @param team
 */
function checkTeam(user, team) {
    return Object.values(team).filter((item) => {
        console.log(item.name)
        console.log(user.name)
        return item._id === user._id
    })
}
