const Router = require('express').Router
const userAuthMiddleware = require('../../../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
    '/clientes/:id/endereco/:id_end',
    userAuthMiddleware,
    async (req, res, next) => {
        try {
            const { id, id_end } = req.params
            const { models } = req.db

            const cliente = await models.cliente.findByPk(id)
            if (!cliente)
                return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })

            const enderecos = await models.endereco.findByPk(id_end)

            if (!enderecos)
                return res.status(400).json({ valido: false, msg: 'Não existem endereços cadastrados!' })

            return res.json(enderecos)
        } catch (error) {
            return next(error)
        }
    }
)

