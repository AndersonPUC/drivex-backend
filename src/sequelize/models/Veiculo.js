const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'veiculo',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			marca: { type: DataTypes.STRING(60), allowNull: false },
			modelo: { type: DataTypes.STRING(60), allowNull: false },
			ano_fabricacao: { type: DataTypes.SMALLINT, allowNull: false },
			ano_modelo: { type: DataTypes.SMALLINT, allowNull: false },
			cor: { type: DataTypes.STRING(60), allowNull: false },
			placa: { type: DataTypes.STRING(7), allowNull: false, unique: true },
			renavam: { type: DataTypes.STRING(11), allowNull: false, unique: true },
			ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, }
		},
		{
			tableName: 'veiculos'
		}
	)
}
