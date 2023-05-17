const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/veiculos',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
				search = '',
				page = 1,
				limit = 10,
				sortBy = 'modelo',
				sortDesc = false,
			} = req.query
            const { models } = req.db

			let where = { }
			const order = [
				[sortBy, sortDesc == true || sortDesc == 'true' ? 'DESC' : 'ASC']
			]

			if (search) {
				where[Op.or] = {
					marca: { [Op.like]: `%${search}%` },
					modelo: { [Op.like]: `%${search}%` },
					placa: { [Op.like]: `%${search}%` },
				}
			}

			const veiculos = await models.veiculo.findAll({
				where,
				limit: Number.parseInt(limit),
				offset: getOffset(page, limit),
				order
			})
			const total = await models.veiculo.count({ where })

			return res.json({ total, veiculos })
		} catch (error) {
			return next(error)
		}
	}
)
