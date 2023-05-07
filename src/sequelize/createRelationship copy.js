module.exports = sequelize => {
	const {
		cliente,
		empresa,
		endereco,
		locacao,
		municipio,
		uf,
		usuario,
		veiculo
	} = sequelize.models

	empresa.hasMany(cliente, {
		as: 'clientes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(veiculo, {
		as: 'veiculos',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(usuario, {
		as: 'usuarios',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(municipio, {
		as: 'municipios',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(uf, {
		as: 'uf',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	locacao.hasMany(veiculo, {
		as: 'veiculos',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	cliente.belongsTo(empresa)
	veiculo.belongsTo(locacao)
	usuario.belongsTo(empresa)
	locacao.belongsTo(empresa)
	uf.belongsTo(empresa)
	municipio.belongsTo(empresa)
}
