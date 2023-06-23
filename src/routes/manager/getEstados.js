const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/manager/estados',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const estados = await models.uf.findAll({ attributes: ['id', 'estado', 'uf'] })

			if (!estados) {
				return res.status(400).json({ valido: false, msg: 'Estados não cadastrada!' })
			}

			return res.json(estados)

		} catch (error) {
			return next(error)
		}
	}
)