const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
        'locacao',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
            dt_locacao: { type: DataTypes.DATE, allowNull: false },
            dt_previsao_entrega: { type: DataTypes.DATE, allowNull: false },
            km_inicial: { type: DataTypes.INTEGER, allowNull: false },
            km_final: { type: DataTypes.INTEGER, allowNull: false },
            observacoes: { type: DataTypes.TEXT, allowNull: true },
            lavagem_inclusa: { type: DataTypes.BOOLEAN, allowNull: true },
            nivel_combustivel: { type: DataTypes.SMALLINT, allowNull: true },
        },
		{
			tableName: 'locacoes'
		}
    )
}