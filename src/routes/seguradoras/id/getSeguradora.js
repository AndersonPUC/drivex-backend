const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/seguradoras/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const seguradora = await models.seguradora.findByPk(id)

			if (!seguradora)
				return res.status(400).json({ valido: false, msg: 'Seguradora não cadastrada!' })
			
			return res.json(seguradora)
		} catch (error) {
			return next(error)
		}
	}
)
