const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'endereco',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			logradouro: { type: DataTypes.STRING(80), allowNull: false },
			bairro: { type: DataTypes.STRING(80), allowNull: false },
			cep: { type: DataTypes.STRING(9), allowNull: false },
			complemento: { type: DataTypes.TEXT, allowNull: false },
		},
		{
			tableName: 'enderecos'
		}
	)
}
