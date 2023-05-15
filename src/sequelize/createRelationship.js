module.exports = sequelize => {
	const {
		empresa,
		municipio,
		uf,
		usuario,
	} = sequelize.models

	empresa.hasMany(usuario, {
		as: 'usuarios',
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
	municipio.belongsTo(uf)

}
