const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define
		(
			'usuario',
			{
				id: { type: DataTypes.BIGINT, primaryKey: true, index: true, allowNull: false, unique: true, autoIncrement: true, },
				nome: { type: DataTypes.STRING, allowNull: false },
				email: { type: DataTypes.STRING, allowNull: false, unique: true },
				senha: { type: DataTypes.STRING, allowNull: false },
				role: { type: DataTypes.ENUM('admin_role', 'rental_role', 'insurance_role'), allowNull: false, defaultValue: 'user_role', },
				inativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, }
			}
		)
}
