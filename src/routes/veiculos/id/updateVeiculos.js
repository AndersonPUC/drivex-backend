const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/veiculos/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
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
            
			const veiculo = await models.veiculo.findByPk(id)
			if (!veiculo) return res.status(400).json({ valido: false, msg: 'Veiculo não cadastrada!' })
			
			const renavamExists = await models.veiculo.findOne({ where: { renavam } })
			if(renavamExists)
				if(renavamExists.renavam != veiculo.renavam) return res.status(400).json({ valido: false, msg: 'Este renavam já está sendo utilizado!' })

            const placaExists = await models.veiculo.findOne({ where: { placa } })
			if(placaExists)
				if(placaExists.placa != veiculo.placa) return res.status(400).json({ valido: false, msg: 'Esta placa já está sendo utilizada!' })

            veiculo.marca=marca
            veiculo.modelo=modelo
            veiculo.ano_fabricacao=ano_fabricacao
            veiculo.ano_modelo=ano_modelo
            veiculo.cor=cor
            veiculo.placa=placa
            veiculo.renavam=renavam
            veiculo.categorium_id=categoria_id

			await veiculo.save()

			return res.status(200).json({ valido: false, msg: 'Veiculo alterado com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
