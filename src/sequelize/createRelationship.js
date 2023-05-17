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
		categoria
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

	empresa.belongsTo(municipio),
	cliente.belongsTo(municipio),
	municipio.belongsTo(uf)
}
