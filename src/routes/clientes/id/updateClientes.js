const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/clientes/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const {
                nome,
                sobrenome,
                email,
                cpf,
                cnh,
                telefone,
                celular,
                dt_nascimento,
                municipioId
            } = req.body
			const { models } = req.db

            if (!nome) return res.status(400).json({ valido: false, msg: 'nome não informado!'})
            if (!sobrenome) return res.status(400).json({ valido: false, msg: 'sobrenome não informado!'})
            if (!email) return res.status(400).json({ valido: false, msg: 'email não informado!'})
            if (!cpf) return res.status(400).json({ valido: false, msg: 'cpf não informado!'})
            if (!cnh) return res.status(400).json({ valido: false, msg: 'cnh não informado!'})
            if (!telefone) return res.status(400).json({ valido: false, msg: 'telefone não informado!'})
            if (!celular) return res.status(400).json({ valido: false, msg: 'celular não informado!'})
            if (!dt_nascimento) return res.status(400).json({ valido: false, msg: 'dt_nascimento não informado!'})
            if (!municipioId) return res.status(400).json({ valido: false, msg: 'municipioId não informado!'})
            

			const cliente = await models.cliente.findByPk(id)
			if (!cliente) return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })
			
			const emailExists = await models.cliente.findOne({ where: { email } })
			if(emailExists)
				if(emailExists.email != cliente.email) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

            const cpfExists = await models.cliente.findOne({ where: { cpf } })
			if(cpfExists)
				if(cpfExists.cpf != cliente.cpf) return res.status(400).json({ valido: false, msg: 'Este CPF já está sendo utilizado!' })

            const cnhExists = await models.cliente.findOne({ where: { cpf } })
			if(cnhExists)
				if(cnhExists.cnh != cliente.cnh) return res.status(400).json({ valido: false, msg: 'Esta CNH já está sendo utilizada!' })

            cliente.nome = nome
			cliente.sobrenome = sobrenome
			cliente.email = email
            cliente.cpf = cpf
            cliente.cnh = cnh
            cliente.telefone = telefone
            cliente.celular = celular
            cliente.dt_nascimento = dt_nascimento
            cliente.municipioId = municipioId

			await cliente.save()

			return res.status(200).json({ valido: false, msg: 'Cliente alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
