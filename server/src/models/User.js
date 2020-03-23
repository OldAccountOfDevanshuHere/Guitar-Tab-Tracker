module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  },
  {
    freezeTableName: true,
    tableName: 'my_very_own_custom_name'
  }
  )
}
