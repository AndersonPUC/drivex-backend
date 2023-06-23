const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/clientes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
                nome,
                sobrenome,
                email,
                cpf,
                cnh,
                telefone,
                celular,
                dt_nascimento,
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
            
			const emailExists = await models.cliente.findOne({ where: { email } })
			if(emailExists) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

            const cpfExists = await models.cliente.findOne({ where: { cpf } })
			if(cpfExists) return res.status(400).json({ valido: false, msg: 'Este CPF já está sendo utilizado!' })

            const cnhExists = await models.cliente.findOne({ where: { cpf } })
			if(cnhExists) return res.status(400).json({ valido: false, msg: 'Esta CNH já está sendo utilizada!' })

            var result = await models.cliente.create({
                nome,
                sobrenome,
                email,
                cpf,
                cnh,
                telefone,
                celular,
                dt_nascimento,
                empresaId: 1
			})

			return res.status(200).json({ valido: true, msg: 'Cliente inserido com sucesso!', id: result.id })
		} catch (error) {
			return next(error)
		}
	}
)
