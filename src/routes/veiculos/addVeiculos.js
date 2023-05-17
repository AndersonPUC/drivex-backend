const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/veiculos',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
                marca,
                modelo,
                ano_fabricacao,
                ano_modelo,
                cor,
                placa,
                renavam,
                categoria_id
            } = req.body
			const { models } = req.db

            if(!marca) return res.status(400).json({ valido: false, msg: 'marca não informado!'})
            if(!modelo) return res.status(400).json({ valido: false, msg: 'modelo não informado!'})
            if(!ano_fabricacao) return res.status(400).json({ valido: false, msg: 'ano_fabricacao não informado!'})
            if(!ano_modelo) return res.status(400).json({ valido: false, msg: 'ano_modelo não informado!'})
            if(!cor) return res.status(400).json({ valido: false, msg: 'cor não informado!'})
            if(!placa) return res.status(400).json({ valido: false, msg: 'placa não informado!'})
            if(!renavam) return res.status(400).json({ valido: false, msg: 'renavam não informado!'})
            if(!categoria_id) return res.status(400).json({ valido: false, msg: 'categoria_id não informado!'})
            
            const placaExists = await models.veiculo.findOne({ where: { placa } })
			if(placaExists) return res.status(400).json({ valido: false, msg: 'Essa placa já está sendo utilizado!' })

			const renavamExists = await models.veiculo.findOne({ where: { renavam } })
			if(renavamExists) return res.status(400).json({ valido: false, msg: 'Este e-mail já está sendo utilizado!' })

            await models.veiculo.create({
                marca,
                modelo,
                ano_fabricacao,
                ano_modelo,
                cor,
                placa,
                renavam,
                categoriumId: categoria_id,
                empresaId: 1
			})

			return res.status(200).json({ valido: false, msg: 'Veiculo inserido com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
