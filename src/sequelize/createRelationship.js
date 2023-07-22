module.exports = sequelize => {
	const {
		empresa,
		municipio,
		uf,
		usuario,
		cliente,
		endereco,
		seguradora,
		veiculo,
		categoria,
		locacao,
	} = sequelize.models

	empresa.hasMany(usuario, {
		as: 'usuarios',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(cliente, {
		as: 'clientes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.hasMany(seguradora, {
		as: 'seguradoras',
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

	empresa.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	veiculo.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	cliente.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	seguradora.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	municipio.hasMany(locacao, {
		as: 'locacoes',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	categoria.hasMany(veiculo, {
		as: 'veiculos',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})
	
	cliente.hasMany(endereco, {
		as: 'enderecos',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	uf.hasMany(municipio, {
		as: 'municipios',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	municipio.hasMany(empresa, {
		as: 'empresas',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	seguradora.hasMany(usuario, {
		as: 'usuarios',
		onDelete: 'CASCADE',
		foreignKey: {
			allowNull: false
		}
	})

	empresa.belongsTo(municipio),
	endereco.belongsTo(municipio),
	municipio.belongsTo(uf)
	locacao.belongsTo(cliente)
	locacao.belongsTo(veiculo)
	veiculo.belongsTo(categoria)
}
