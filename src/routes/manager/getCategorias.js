const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/manager/categorias',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
            const { models } = req.db

			const categorias = await models.categoria.findAll({ attributes: ['id', 'categoria'] })
			
            return res.json(categorias)
		} catch (error) {
			return next(error)
		}
	}
)
