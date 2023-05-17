const Router = require('express').Router
const { Op } = require('sequelize')
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')
const adminAuthMiddleware = require('../../middlewares/adminAuth.middleware')
const getOffset = require('../../helpers/getOffset')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios',
	userAuthMiddleware,
	adminAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
				search = '',
				page = 1,
				limit = 10,
				sortBy = 'nome',
				sortDesc = false,
			} = req.query
			const { usuario: Usuario } = req.db.models

			let where = { }
			const order = [
				[sortBy, sortDesc == true || sortDesc == 'true' ? 'DESC' : 'ASC']
			]

			if (search) {
				where[Op.or] = {
					nome: { [Op.like]: `%${search}%` },
					email: { [Op.like]: `%${search}%` },
				}
			}

			const usuarios = await Usuario.findAll({
				where,
				attributes: { exclude: ['senha'] },
				limit: Number.parseInt(limit),
				offset: getOffset(page, limit),
				order
			})

			const total = await Usuario.count({ where })
			
			return res.json({ total, usuarios })
		} catch (error) {
			return next(error)
		}
	}
)
