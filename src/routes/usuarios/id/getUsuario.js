const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const adminAuthMiddleware = require('../../../middlewares/adminAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/usuarios/:id',
	userAuthMiddleware,
	adminAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const usuario = await models.usuario.findByPk(id, {
				attributes: { exclude: ['senha'] }
			})

			if (!usuario) {
				return res.status(400).json({ valido: false, msg: 'Usuário não cadastrado!' })
			}
			
			return res.json(usuario)
		} catch (error) {
			return next(error)
		}
	}
)
