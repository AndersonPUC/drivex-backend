const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')
const Sequelize = require('sequelize')

module.exports = Router({ mergeParams: true }).get(
	'/manager/marcas',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
            const { models } = req.db
			const {
				categoria,
			} = req.query

			const marcas = await models.veiculo.findAll({ where: { categoriumId: categoria }, attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('marca')) ,'marca']] })
			
            return res.json(marcas)
		} catch (error) {
			return next(error)
		}
	}
)
