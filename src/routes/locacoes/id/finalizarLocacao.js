const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/locacoes/:id/finalizar',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db
            const {
                km_final
            } = req.body

			const locacao = await models.locacao.findByPk(id)

			if (!locacao) return res.status(400).json({ valido: false, msg: 'Locação não cadastrada!' })
            if (!km_final) return res.status(400).json({ valido: false, msg: 'Km final não pode ser vazio ou igual a zero!' })
            if (km_final < 1 || km_final <= locacao.km_inicial) return res.status(400).json({ valido: false, msg: 'Km final deve ser maior que o km inicial!' })

            locacao.dt_entrega = Date.now()
            locacao.km_final = km_final

            await locacao.save()

			return res.json(locacao)
		} catch (error) {
			return next(error)
		}
	}
)
