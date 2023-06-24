const Router = require('express').Router
const userAuthMiddleware = require('../../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
    '/clientes/:id/endereco',
    userAuthMiddleware,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { models } = req.db

            const cliente = await models.cliente.findByPk(id)
            if (!cliente)
                return res.status(400).json({ valido: false, msg: 'Cliente não cadastrado!' })

            const enderecos = await models.endereco.findAll({
                where: { clienteId: id },
                include:
                {
                    model: models.municipio,
                    required: true,
                    include: { model: models.uf, required: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    attributes: { exclude: ['ufId', 'createdAt', 'updatedAt'] }
                },
                attributes: { exclude: ['municipioId', , 'createdAt', 'updatedAt'] }
            })


            if (!enderecos)
                return res.status(400).json({ valido: false, msg: 'Não existem endereços cadastrados!' })

            return res.json(enderecos)
        } catch (error) {
            return next(error)
        }
    }
)

