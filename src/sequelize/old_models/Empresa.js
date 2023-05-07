const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'empresa',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			nome: { type: DataTypes.STRING(120) },
			endereco: { type: DataTypes.STRING(120), allowNull: false },
			ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, }			
		},
		{
			tableName: 'empresas'
		}
	)
}
