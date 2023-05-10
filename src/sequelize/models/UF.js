const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
        'uf',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
            codigo_ibge: { type: DataTypes.STRING(7), allowNull: false },
            estado: { type: DataTypes.STRING(45), allowNull: false },
            uf: { type: DataTypes.STRING(2), allowNull: false },
            regiao: { type: DataTypes.STRING(45), allowNull: false},
        },
		{
			tableName: 'uf'
		}
    )
}