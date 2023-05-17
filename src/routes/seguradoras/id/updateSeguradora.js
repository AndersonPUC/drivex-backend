const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/seguradoras/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
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
            

			const seguradora = await models.seguradora.findByPk(id)
			if (!seguradora) return res.status(400).json({ valido: false, msg: 'Seguradora não cadastrada!' })
			
			const emailExists = await models.seguradora.findOne({ where: { email } })
			if(emailExists)
				if(emailExists.email != seguradora.email) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

            const cnpjExists = await models.seguradora.findOne({ where: { cnpj } })
			if(cnpjExists)
				if(cnpjExists.cnpj != seguradora.cnpj) return res.status(400).json({ valido: false, msg: 'Este CNPJ já está sendo utilizado!' })

            seguradora.nome_social = nome_social
            seguradora.nome_fantasia = nome_fantasia
            seguradora.email = email

			await seguradora.save()

			return res.status(200).json({ valido: false, msg: 'Seguradora alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
