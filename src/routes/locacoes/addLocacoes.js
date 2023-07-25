const Router = require('express').Router
const userAuthMiddleware = require('../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).post(
	'/locacoes',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const {
                dt_locacao,
                dt_previsao_entrega,
                km_inicial,
                observacoes,
                lavagem_inclusa,
                nivel_combustivel,
                veiculo_id,
                cliente_id,
                // seguradora_id,
            } = req.body
			const { models } = req.db


    
            if(!dt_locacao) return res.status(400).json({ valido: false, msg: 'dt_locacao não informado!'})
            if(!dt_previsao_entrega) return res.status(400).json({ valido: false, msg: 'dt_previsao_entrega não informado!'})
            if(!km_inicial) return res.status(400).json({ valido: false, msg: 'km_inicial não informado!'})
            if(!observacoes) return res.status(400).json({ valido: false, msg: 'observacoes não informado!'})
            if(!nivel_combustivel) return res.status(400).json({ valido: false, msg: 'nivel_combustivel não informado!'})
            if(!veiculo_id) return res.status(400).json({ valido: false, msg: 'veiculo_id não informado!'})
            if(!cliente_id) return res.status(400).json({ valido: false, msg: 'cliente_id não informado!'})
            // if(!seguradora_id) return res.status(400).json({ valido: false, msg: 'seguradora_id não informado!'})
            
            
            //if(!empresa_id) return res.status(400).json({ valido: false, msg: 'empresa_id não informado!'})
            //if(!municipio_id) return res.status(400).json({ valido: false, msg: 'municipio_id não informado!'})
            const veiculo = await models.veiculo.findByPk(veiculo_id)
			if(!veiculo) return res.status(400).json({ valido: false, msg: 'Veiculo não existe!' })

            const cliente = await models.cliente.findByPk(cliente_id)
			if(!cliente) return res.status(400).json({ valido: false, msg: 'Cliente não existe!' })
            
            const usuario = await models.usuario.findByPk(req.usuario.id)
            if(!usuario) return res.status(400).json({ valido: false, msg: 'Usuario não existe.'})

            const seguradora = await models.seguradora.findByPk(usuario.seguradoraId)
			if(!seguradora) return res.status(400).json({ valido: false, msg: 'Seguradora não existe!' })

            const empresa = await models.empresa.findByPk(1)
            await models.locacao.create({
                dt_locacao,
                dt_previsao_entrega,
                km_inicial,
                km_final: 0,
                observacoes,
                lavagem_inclusa,
                nivel_combustivel,
                veiculoId: veiculo.id,
                clienteId: cliente.id,
                seguradoraId: 1,//seguradora.id,
                empresaId: empresa.id,
                municipioId: empresa.municipioId
			})

			return res.status(200).json({ valido: true, msg: 'Locacao inserido com sucesso!'})
		} catch (error) {
			return next(error)
		}
	}
)
