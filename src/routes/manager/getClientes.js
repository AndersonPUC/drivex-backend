const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/manager/clientes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
            const { models } = req.db

			const cliente = await models.cliente.findAll({ attributes: ['id', 'nome'] })
			
            return res.json(cliente)
		} catch (error) {
			return next(error)
		}
	}
)
