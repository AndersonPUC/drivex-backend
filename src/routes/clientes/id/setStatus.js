const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/clientes/:id/status',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { status } = req.body

			const { models } = req.db

			const cliente = await models.cliente.findByPk(id)
			if (!cliente) return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })
			
            cliente.ativo = status

			await cliente.save()

			return res.status(200).json({ valido: true, msg: 'Cliente alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
