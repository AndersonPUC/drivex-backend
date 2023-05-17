const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/clientes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
				search = '',
				page = 1,
				limit = 10,
				sortBy = 'nome',
				sortDesc = false,
			} = req.query
            const { models } = req.db

			let where = { }
			const order = [
				[sortBy, sortDesc == true || sortDesc == 'true' ? 'DESC' : 'ASC']
			]

			if (search) {
				where[Op.or] = {
					nome: { [Op.like]: `%${search}%` },
					sobrenome: { [Op.like]: `%${search}%` },
					cpf: { [Op.like]: `%${search}%` },
					email: { [Op.like]: `%${search}%` },
				}
			}

			const clientes = await models.cliente.findAll({
				where,
				limit: Number.parseInt(limit),
				offset: getOffset(page, limit),
				order
			})
			const total = await models.cliente.count({ where })
			
			return res.json({ total, clientes })
		} catch (error) {
			return next(error)
		}
	}
)
