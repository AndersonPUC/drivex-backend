const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const Sequelize = require('sequelize')

module.exports = Router({ mergeParams: true }).get(
	'/manager/modelos',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
            const { models } = req.db
			const {
				categoria,
				marca,
			} = req.query

			const modelos = await models.veiculo.findAll({ where: { categoriumId: categoria, marca: marca }, attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('modelo')) ,'modelo']] })
			
            return res.json(modelos)
		} catch (error) {
			return next(error)
		}
	}
)
