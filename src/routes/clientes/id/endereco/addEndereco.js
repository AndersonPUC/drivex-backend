const Router = require('express').Router
const userAuthMiddleware = require('../../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/clientes/:id/endereco',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
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

            await models.endereco.create({
                logradouro,
                bairro,
                cep,
                complemento,
                municipioId,
                clienteId: cliente.id
			})

			return res.status(200).json({ valido: false, msg: 'Endereço inserido com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
