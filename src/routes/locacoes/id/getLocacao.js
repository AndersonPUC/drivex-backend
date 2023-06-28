const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/locacoes/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const locacao = await models.locacao.findOne({
				where: { id },
				attributes: { exclude: ['clienteId', 'veiculoId'] },
				include: [{
					model: models.cliente,
					required: true,
					attributes: ['id', 'nome', 'sobrenome'],
				}, {
					model: models.veiculo,
					required: true,
					attributes: ['id', 'marca', 'modelo'],
					include: {
						model: models.categoria,
						required: true,
						attributes: ['id', 'categoria'],
					}
				}]

			})

			if (!locacao)
				return res.status(400).json({ valido: false, msg: 'Locação não cadastrada!' })

			return res.json(locacao)
		} catch (error) {
			return next(error)
		}
	}
)
