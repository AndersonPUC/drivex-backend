const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/locacoes/:id/status',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { status } = req.body

			const { models } = req.db

			const locacao = await models.locacao.findByPk(id)
			if (!locacao) return res.status(400).json({ valido: false, msg: 'Locacao não cadastrado!' })
			
            locacao.ativo = status

			await locacao.save()

			return res.status(200).json({ valido: true, msg: 'Locacao alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
