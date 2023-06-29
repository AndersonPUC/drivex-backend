const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'locacao',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: true,
				index: true,
				primaryKey: true,
				autoIncrement: true
			},
			dt_locacao: { type: DataTypes.DATE, allowNull: false },
			dt_previsao_entrega: { type: DataTypes.DATE, allowNull: false },
			dt_entrega: { type: DataTypes.DATE, allowNull: true },
			km_inicial: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
			km_final: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
			observacoes: { type: DataTypes.TEXT },
			lavagem_inclusa: { type: DataTypes.BOOLEAN, defaultValue: false },
			nivel_combustivel: { type: DataTypes.ENUM('0', '1/4', '1/2', '3/4', '4/4'), allowNull: false, defaultValue: '4/4', },
			ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, },
		},
		{
			tableName: 'locacoes'
		}
	)
}
