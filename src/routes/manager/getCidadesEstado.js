const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/manager/cidades/estado/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const cidades = await models.municipio.findAll({ where: { ufId: id }, attributes: ['id', 'ufId', 'municipio'] })

			if (!cidades) {
				return res.status(400).json({ valido: false, msg: 'Cidades não cadastrada!' })
			}

			return res.json(cidades)

		} catch (error) {
			return next(error)
		}
	}
)