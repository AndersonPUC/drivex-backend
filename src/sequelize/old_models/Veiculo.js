const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
        'veiculo',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
            marca: { type: DataTypes.STRING(60), allowNull: false },
            modelo: { type: DataTypes.STRING(60), allowNull: false },
            ano_fabricacao: { type: DataTypes.SMALLINT, allowNull: false },
            ano_modelo: { type: DataTypes.SMALLINT, allowNull: false },
            cor: { type: DataTypes.STRING(60), allowNull: false },
            placa: { type: DataTypes.STRING(7), allowNull: false, unique: true },
            renavam: { type: DataTypes.STRING(40), allowNull: false, unique: true },
            inativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        },
		{
			tableName: 'veiculos'
		}
    )
}