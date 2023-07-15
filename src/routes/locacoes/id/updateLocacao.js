const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).put(
	'/locacoes/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const {
                dt_locacao,
                dt_previsao_entrega,
                km_inicial,
                observacoes,
                lavagem_inclusa,
                nivel_combustivel,
                veiculo_id,
                cliente_id,
                seguradora_id,
            } = req.body

			const { models } = req.db

            if(!dt_locacao) return res.status(400).json({ valido: false, msg: 'dt_locacao não informado!'})
            if(!dt_previsao_entrega) return res.status(400).json({ valido: false, msg: 'dt_previsao_entrega não informado!'})
            if(!km_inicial) return res.status(400).json({ valido: false, msg: 'km_inicial não informado!'})
            if(!observacoes) return res.status(400).json({ valido: false, msg: 'observacoes não informado!'})
            if(!nivel_combustivel) return res.status(400).json({ valido: false, msg: 'nivel_combustivel não informado!'})
            if(!veiculo_id) return res.status(400).json({ valido: false, msg: 'veiculo_id não informado!'})
            if(!cliente_id) return res.status(400).json({ valido: false, msg: 'cliente_id não informado!'})
            if(!seguradora_id) return res.status(400).json({ valido: false, msg: 'seguradora_id não informado!'})
            
			const locacao = await models.locacao.findByPk(id)
			if (!locacao) return res.status(400).json({ valido: false, msg: 'Locação não cadastrada!' })

            locacao.dt_locacao = dt_locacao
            locacao.dt_previsao_entrega = dt_previsao_entrega
            locacao.km_inicial = km_inicial
            locacao.observacoes = observacoes
            locacao.lavagem_inclusa = lavagem_inclusa
            locacao.nivel_combustivel = nivel_combustivel
            locacao.veiculo_id = veiculo_id
            locacao.cliente_id = cliente_id
            locacao.seguradora_id = seguradora_id

			await locacao.save()

			return res.status(200).json({ valido: true, msg: 'Locação alterada com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
