const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/locacoes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
				// search = '',
				page = 1,
				limit = 10,
				sortBy = 'dt_locacao',
				sortDesc = true,
				ativo = true,
			} = req.query
            const { models } = req.db

			let where = { }
			const order = [
				[sortBy, sortDesc == true || sortDesc == 'true' ? 'DESC' : 'ASC']
			]

			// if (search) {
			// 	where[Op.or] = {
			// 		nome_social: { [Op.iLike]: `%${search}%` },
			// 		nome_fantasia: { [Op.iLike]: `%${search}%` },
			// 		cnpj: { [Op.iLike]: `%${search}%` },
			// 		email: { [Op.iLike]: `%${search}%` },
			// 	}
			// }


			// if(verEntregues == 'true') {
			// 	where[Op.or] = {
			// 		dt_entrega: { [Op.not]: null }
			// 	}
			// }
			
			// if(verPendentes == 'true') {
			// 	where[Op.or] = {
			// 		dt_entrega: { [Op.is]: null }
			// 	}
			// }
			
			
			where.ativo = ativo

			const locacoes = await models.locacao.findAll({
				where,
				limit: Number.parseInt(limit),
				offset: getOffset(page, limit),
				order,
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
			const total = await models.locacao.count({ where })

			return res.json({ total, locacoes })
		} catch (error) {
			return next(error)
		}
	}
)
