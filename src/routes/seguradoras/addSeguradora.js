const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/seguradoras',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
                cnpj,
                nome_social,
                nome_fantasia,
                email,
            } = req.body
			const { models } = req.db

            if (!cnpj) return res.status(400).json({ valido: false, msg: 'cnpj não informado!'})
            if (!nome_social) return res.status(400).json({ valido: false, msg: 'nome_social não informado!'})
            if (!nome_fantasia) return res.status(400).json({ valido: false, msg: 'nome_fantasia não informado!'})
            if (!email) return res.status(400).json({ valido: false, msg: 'email não informado!'})
            
            const cnpjExists = await models.seguradora.findOne({ where: { cnpj } })
			if(cnpjExists) return res.status(400).json({ valido: false, msg: 'Este CNPJ já está sendo utilizado!' })

			const emailExists = await models.seguradora.findOne({ where: { email } })
			if(emailExists) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

            await models.seguradora.create({
                cnpj,
                nome_social,
                nome_fantasia,
                email,
                empresaId: 1
			})

			return res.status(200).json({ valido: false, msg: 'Seguradora inserido com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
