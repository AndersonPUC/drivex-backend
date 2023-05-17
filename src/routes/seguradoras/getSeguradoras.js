const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/seguradoras',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
				search = '',
				page = 1,
				limit = 10,
				sortBy = 'nome_social',
				sortDesc = false,
			} = req.query
            const { models } = req.db

			let where = { }
			const order = [
				[sortBy, sortDesc == true || sortDesc == 'true' ? 'DESC' : 'ASC']
			]

			if (search) {
				where[Op.or] = {
					nome_social: { [Op.like]: `%${search}%` },
					nome_fantasia: { [Op.like]: `%${search}%` },
					cnpj: { [Op.like]: `%${search}%` },
					email: { [Op.like]: `%${search}%` },
				}
			}

			const seguradoras = await models.seguradora.findAll({
				where,
				limit: Number.parseInt(limit),
				offset: getOffset(page, limit),
				order
			})
			const total = await models.seguradora.count({ where })

			return res.json({ total, seguradoras })
		} catch (error) {
			return next(error)
		}
	}
)
