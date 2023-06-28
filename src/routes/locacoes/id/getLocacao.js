const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/locacoes/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const locacao = await models.locacao.findByPk(id)

			if (!locacao)
				return res.status(400).json({ valido: false, msg: 'Locação não cadastrada!' })
			
			return res.json(locacao)
		} catch (error) {
			return next(error)
		}
	}
)
