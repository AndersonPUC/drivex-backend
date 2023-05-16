const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'cliente',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			nome: { type: DataTypes.STRING(45), allowNull: false },
			sobrenome: { type: DataTypes.STRING(45), allowNull: false },
			email: { type: DataTypes.STRING(120), allowNull: false },
			cpf: { type: DataTypes.STRING(11), allowNull: false },
			cnh: { type: DataTypes.STRING(30), allowNull: false },
			telefone: { type: DataTypes.STRING(11), allowNull: false },
			celular: { type: DataTypes.STRING(11), allowNull: false },
			dt_nascimento: { type: DataTypes.DATE, allowNull: false },
			ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, }			
		},
		{
			tableName: 'clientes'
		}
	)
}
