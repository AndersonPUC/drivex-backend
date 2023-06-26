const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/seguradoras/:id/status',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { status } = req.body

			const { models } = req.db

			const seguradora = await models.seguradora.findByPk(id)
			if (!seguradora) return res.status(400).json({ valido: false, msg: 'Seguradora não cadastrada!' })
			
            seguradora.ativo = status

			await seguradora.save()

			return res.status(200).json({ valido: true, msg: 'Seguradora alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
