const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/veiculos/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const veiculo = await models.veiculo.findByPk(id)

			if (!veiculo)
				return res.status(400).json({ valido: false, msg: 'Veiculo não cadastrado!' })
			
			return res.json(veiculo)
		} catch (error) {
			return next(error)
		}
	}
)
