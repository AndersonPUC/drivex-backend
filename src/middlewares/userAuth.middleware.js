const jwt = require('jsonwebtoken')
const getJWTToken = require('../helpers/getJWTToken')

module.exports = async (req, res, next) => {
	try {
		const { models } = req.db
		const token = getJWTToken(req)

		if (!token || token === '') return res.status(403).send({ valido: false, msg: 'Token vazio!' })

		const tokenUsuario = jwt.verify(token, process.env.USER_KEY)

		if (!tokenUsuario) return res.status(403).send({ valido: false, msg: 'Token inválido!' })

		const usuario = await models.usuario.findByPk(tokenUsuario.id)

		if (!usuario) return res.status(403).send({ valido: false, msg: 'Usuário não encontrado!' })

		if (usuario.inativo) return res.status(403).send({ valido: false, msg: 'Usuário inativo!' })

		req.usuario = usuario
		return next()
	} catch (error) {
		return res.status(500).send(error)
	}
}
