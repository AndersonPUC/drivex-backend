const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/manager/seguradoras',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
            const { models } = req.db

			const seguradora = await models.seguradora.findAll({ attributes: ['id', 'nome_fantasia'] })
			
            return res.json(seguradora)
		} catch (error) {
			return next(error)
		}
	}
)
