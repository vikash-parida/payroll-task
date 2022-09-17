module.exports = (sequelize, DataTypes) => {
    const userToken = sequelize.define('user_token', {
      user_id: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "token"
      },
    }, {
      freezeTableName: true,
      tableName: "user_token",
    })
    return userToken
  }