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
			logradouro: { type: DataTypes.STRING(90), allowNull: false },
			complemento: { type: DataTypes.STRING(90), allowNull: false },
			bairro: { type: DataTypes.STRING(45), allowNull: false },
			cep: { type: DataTypes.STRING(8), allowNull: false },
		},
		{
			tableName: 'enderecos'
		}
	)
}
