const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
        'municipio',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
            codigo_ibge: { type: DataTypes.STRING(6), allowNull: false },
            municipio: { type: DataTypes.STRING(90), allowNull: false },
        },
		{
			tableName: 'municipios'
		}
    )
}