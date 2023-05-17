const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'seguradora',
		{
			id: { type: DataTypes.BIGINT, allowNull: false, unique: true, index: true, primaryKey: true, autoIncrement: true },
			cnpj: { type: DataTypes.STRING(14), allowNull: false, unique: true },
			nome_social: { type: DataTypes.STRING(120), allowNull: false },
			nome_fantasia: { type: DataTypes.STRING(120), allowNull: false },
			email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
		},
		{
			tableName: 'seguradoras'
		}
	)
}
