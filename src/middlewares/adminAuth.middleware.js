module.exports = async (req, res, next) => {
	try {
		const { usuario } = req

		if (!usuario.role=="admin_role")
			return res.status(500).send({ valido: false, msg: 'Usuário sem permissão!'})

		return next()
	} catch (error) {
		return res.status(500).send(error)
	}
}
