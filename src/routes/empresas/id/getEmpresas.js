const Router = require('express').Router
const userAuthMiddleware = require('../../../middlewares/userAuth.middleware')

module.exports = Router({ mergeParams: true }).get(
	'/empresas/:id',
	userAuthMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params
			const { models } = req.db

			const empresa = await models.empresa.findOne({
                where: { id },
                include:
                {
                    model: models.municipio,
                    equired: true,
                    attributes: ['municipio'],
                    include: { model: models.uf, equired: true, attributes: ['estado', 'uf'] }
                }
            })

			if (!empresa) {
				return res.status(400).json({ valido: false, msg: 'Empresa não cadastrada!' })
			}

			return res.json({
                id: empresa.id,
                nome: empresa.nome,
                endereco: empresa.endereco,
                ativo: empresa.ativo,
                municipio: empresa.municipio.municipio,
                uf: empresa.municipio.uf.uf,
                estado:  empresa.municipio.uf.estado
            })

		} catch (error) {
			return next(error)
		}
	}
)