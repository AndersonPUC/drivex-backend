const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'categoria',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			categoria: { type: DataTypes.STRING(60), allowNull: false, unique: true },
		},
		{
			tableName: 'categorias'
		}
	)
}
