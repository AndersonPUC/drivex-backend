const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')
const adminAuthMiddleware = require('../../../middlewares/adminAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/usuarios/:id',
	userAuthMiddleware,
	adminAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { nome, email, role } = req.body
			const { models } = req.db

			if (!nome) return res.status(400).json({ valido: false, msg: 'Nome não informado!' })
			if (!email) return res.status(400).json({ valido: false, msg: 'Email não informado!' })
			if (!role) return res.status(400).json({ valido: false, msg: 'UserRole não informado!' })

			const usuario = await models.usuario.findByPk(id)
			if (!usuario) return res.status(400).json({ valido: false, msg: 'Usuário não cadastrado!' })
			
			const userExists = await models.usuario.findOne({ where: { email } })
			if(userExists)
				if(userExists.email != usuario.email) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

			usuario.nome = nome
			usuario.email = email
			usuario.role = role

			await usuario.save()

			return res.status(200).json({ valido: false, msg: 'Usuario alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
