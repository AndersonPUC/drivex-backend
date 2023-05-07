const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
var validator = require('validator')

module.exports = Router({ mergeParams: true }).post(
	'/signin',
	async (req, res, next) => {
		try {
			const { email, senha } = req.body
			const { usuario: Usuario } = req.db.models

			if (!(email || senha)) return res.status(400).json({ valido: false, msg: 'Você deve informar o e-mail e a senha' })

			if(!validator.isEmail(email)) res.status(400).json({ valido: false, msg: 'E-mail inválido!' })
			if(!senha) return  res.status(400).json({ valido: false, msg: 'Senha não informada!' })

			const usuario = await Usuario.findOne({ where: { email } })
			if (!usuario) return res.status(400).json({ valido: false, msg: 'E-mail e/ou senha inválidos!' })

			if (usuario.inativo) return res.status(400).json({ valido: false, msg: 'O usuário está inativo!' })

			if (!bcrypt.compareSync(senha, usuario.senha)) return res.status(400).json({ valido: false, msg: 'E-mail e/ou senha inválidos!' })

			const expirationToken = Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 3)

			const {
				id,
				nome,
				role,
				inativo
			} = usuario

			const payload = {
				id: id,
				nome: nome,
				email: email,
				role: role,
				inativo: inativo,
				exp: expirationToken
			}

			const accessToken = jwt.sign(payload, process.env.USER_KEY)

			return res.json({ ...payload, accessToken })
		} catch (error) {
			return next(error)
		}
	}
)
