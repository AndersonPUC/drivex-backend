const Router = require('express').Router
const bcrypt = require('bcrypt-nodejs')
var validator = require('validator')

module.exports = Router({ mergeParams: true }).post(
	'/signup',
	async (req, res, next) => {
		try {
			const {
                nome,
                email,
                senha
            } = req.body
			const { usuario: Usuario } = req.db.models

			if (!nome) return res.status(400).json({ valido: false, msg: 'Nome não informado!' })
			if (!validator.isEmail(email)) return res.status(400).json({ valido: false, msg: 'Email inválido!' })
			if (!senha) return res.status(400).json({ valido: false, msg: 'Senha não informada!' })

			const userExists = await Usuario.findOne({ where: { email } })
			if (userExists) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })
			
			const salt = bcrypt.genSaltSync(10)
			const senhaBcrypt = bcrypt.hashSync(senha, salt)

			/*
			 * aqui não é necessário receber o parametro, futuramente em outras versoes é
			 * importante que passe a receber o identificador ou cnpj da empresa que está
			 * cadastrando o usuário como um controle interno
			 */
			
			await Usuario.create({
				nome,
				email,
				senha: senhaBcrypt,
				empresaId: 1
			})

			return res.status(200).json({ valido: true, msg: 'Usuário criado com sucesso!' })
		} catch (error) {
			return next(error)
		}
	}
)