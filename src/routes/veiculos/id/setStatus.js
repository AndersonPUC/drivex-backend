const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/veiculos/:id/status',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { status } = req.body

			const { models } = req.db

			const veiculo = await models.veiculo.findByPk(id)
			if (!veiculo) return res.status(400).json({ valido: false, msg: 'Veiculo não cadastrado!' })
			
            veiculo.ativo = status

			await veiculo.save()

			return res.status(200).json({ valido: true, msg: 'Veiculo alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
