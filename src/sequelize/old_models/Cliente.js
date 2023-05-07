const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
        'cliente',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
            nome: { type: DataTypes.STRING(45), allowNull: false },
            sobrenome: { type: DataTypes.STRING(45), allowNull: false },
            email: { type: DataTypes.STRING(120), allowNull: false },
            cpf: { type: DataTypes.STRING(11), allowNull: false, unique: true },
            cnh: { type: DataTypes.STRING(30), allowNull: false, unique: true },
            telefone: { type: DataTypes.STRING(11), allowNull: false },
            celular: { type: DataTypes.STRING(11), allowNull: false },
            dt_nascimento: { type: DataTypes.DATE, allowNull: false },
        },
		{
			tableName: 'clientes'
		}
    )
}