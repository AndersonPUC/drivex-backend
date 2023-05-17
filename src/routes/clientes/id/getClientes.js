const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/clientes/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const cliente = await models.cliente.findByPk(id)

			if (!cliente) {
				return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })
			}
			
			return res.json(cliente)
		} catch (error) {
			return next(error)
		}
	}
)
