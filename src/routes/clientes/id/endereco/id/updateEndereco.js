const Router = require('express').Router
const userAuthMiddleware = require('../../../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/clientes/:id/endereco/:id_end',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id, id_end } = req.params
            const {
                logradouro,
                bairro,
                cep,
                complemento,
                municipioId
            } = req.body

			const { models } = req.db

            if (!logradouro) return res.status(400).json({ valido: false, msg: 'logradouro não informado!'})
            if (!bairro) return res.status(400).json({ valido: false, msg: 'bairro não informado!'})
            if (!cep) return res.status(400).json({ valido: false, msg: 'cep não informado!'})
            if (!complemento) return res.status(400).json({ valido: false, msg: 'complemento não informado!'})
            if (!municipioId) return res.status(400).json({ valido: false, msg: 'municipioId não informado!'})

            const cliente = await models.cliente.findByPk(id)
			if (!cliente)
				return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })

            const enderecos = await models.endereco.findByPk(id_end)

            enderecos.logradouro = logradouro
            enderecos.bairro = bairro
            enderecos.cep = cep
            enderecos.complemento = complemento
            enderecos.municipioId = municipioId

            await enderecos.save()

			return res.status(200).json({ valido: true, msg: 'Endereço alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
