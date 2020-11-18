const { Model } = require('sequelize');

module.exports= (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, {
        foreignKey: 'user_id',
      });
    };

    static getAllUser() {
      return this.findAll({
        attributes: ['id', 'username'],
      }).then((res) => res);
    };
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password_hash: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  });

  return User;
};
